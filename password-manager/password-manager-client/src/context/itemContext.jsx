import {createContext, useCallback, useContext, useState} from "react";
import axios from "axios";
import {useAuth} from "./authContext.jsx";
import {encryptPasswordWithPublicKey, signMessageWithKeyPair} from "../security/clientToServer.js";
import {
    decryptAndVerifyMessage,
    decryptPasswordWithPrivateKey,
    verifyMessageWithPublicKey
} from "../security/serverToClient.js";

const ItemContext = createContext({
    deleteItemById: () => {
    },
    editItemById: () => {
    },
    createItem: () => {
    },
    fetchItems: () => {
    },
    items: []
});

function ItemProvider({children}) {
    const [items, setItems] = useState([]);
    const {publicKeyServerArmored, username, email, privateKey, publicKey} = useAuth();

    const fetchItems = useCallback(async () => {
        if (privateKey && publicKey && email) {
            const response = await axios.get('http://localhost:5000/api/v1/item', {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(response => response.data);

            const items = await Promise.all(response.map(async (item) => {
                const decryptPassword = await decryptAndVerifyMessage(item, email, privateKey, publicKey);
                return {...item, password: decryptPassword};
            }));

            setItems(items);
        }
    }, [privateKey, publicKey, email]);

    const editItemById = async (item) => {

        const encryptedMessage = await encryptPasswordWithPublicKey(item.password, publicKeyServerArmored);
        const {detachedSignature, publicKeyArmoredSign} = await signMessageWithKeyPair(item.password, email);

        const itemWithEncryptedPassword = {
            ...item,
            encryptedMessage,
            detachedSignature,
            publicKeyArmoredSign
        };

        const response = await axios.patch(`http://localhost:5000/api/v1/item/${item.id}`, itemWithEncryptedPassword, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        }).then((response) => response.data);
        const id = item.id;
        const decryptPassword = await decryptAndVerifyMessage(response, email, privateKey, publicKey)
        const updatedItems = items.map((item) => {
            if (item.id === id) {
                return {...item, ...response, password: decryptPassword};
            }
            return item;
        });
        setItems(updatedItems);
    };

    const deleteItemById = async (id) => {
        axios.delete(`http://localhost:5000/api/v1/item/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then((response) => response.data);

        const updatedItems = items.filter((item) => {
            return item.id !== id;
        });

        setItems(updatedItems);
    };

    const createItem = async (item) => {
        const encryptedMessage = await encryptPasswordWithPublicKey(item.password, publicKeyServerArmored);
        const {detachedSignature, publicKeyArmoredSign} = await signMessageWithKeyPair(item.password,email);
        const itemWithEncryptedPassword = {
            ...item,
            encryptedMessage,
            detachedSignature,
            publicKeyArmoredSign
        };
        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/item',
                itemWithEncryptedPassword,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const decryptPassword = await decryptAndVerifyMessage(response.data, email, privateKey, publicKey);
            const updatedItems = [...items, {...response.data, password: decryptPassword}];
            setItems(updatedItems);
        } catch (error) {
            // Handle error if the POST request fails
            console.error('Error creating item:', error);
        }
    };

    const valueToShare = {
        items,
        deleteItemById,
        editItemById,
        createItem,
        fetchItems,
    };
    return (
        <ItemContext.Provider value={valueToShare}>
            {children}
        </ItemContext.Provider>
    );
}

const useItem = () => useContext(ItemContext)
export {ItemProvider, useItem}
