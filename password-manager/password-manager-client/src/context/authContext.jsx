import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import generateKeyPair from "../security/generateKeyPair.js";
import {useItem} from "./itemContext.jsx";


const AuthContext = createContext({
    isAuthenticated: false,
    showError: false,
    isMember: false,
    errorMessage: '',
    publicKeyServerArmored: null,
    privateKey: null,
    publicKey: null,
    username: null,
    email: null,
    token: null,
    signup: () => {
    },
    login: () => {
    },
    logout: () => {
    },
    setIsMember: () => {
    },
})

const AuthProvider = ({children}) => {
   // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isMember, setIsMember] = useState(false)
    const [userData, setUserData] = useState({
        username: null,
        email: null,
        publicKeyServerArmored: null,
        privateKey: null,
        publicKey: null,
        isAuthenticated: false
    });
    const signup = async (currentUser) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/register', currentUser)
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token)
                setIsMember(true)
            }
        } catch (error) {
            if (error.response.data && error.response.data.msg) {
                setShowError(true)
                setErrorMessage(error.response.data.msg);
                setTimeout(() => {
                    setShowError(false)
                    setErrorMessage('')
                }, 5000)
            }
        }
    };
    const login = async (currentUser) => {
        const {privateKeyArmored, publicKeyArmored} = await generateKeyPair(currentUser.email)
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/login',
                {
                    ...currentUser,
                    publicKeyClient: publicKeyArmored
                })
            if (response.data && response.data.username
                && response.data.token && response.data.publicKeyArmored
                && response.data.email) {
                localStorage.setItem('token', response.data.token)
                setUserData(prevData => ({
                    ...prevData,
                    username: response.data.username,
                    email: response.data.email,
                    publicKeyServerArmored: response.data.publicKeyArmored,
                    privateKey: privateKeyArmored,
                    publicKey: publicKeyArmored,
                    isAuthenticated: true
                }));
            }
        } catch (error) {
            console.log(error.message)
            if (error.message) {
                setShowError(true)
                setErrorMessage(error.message)
                setTimeout(() => {
                    setShowError(false)
                    setErrorMessage('')
                }, 5000)
            }
        }
    };
    const logout = () => {
        setUserData(prevData => ({
            ...prevData,
            isAuthenticated: false
        }));
        localStorage.removeItem('token')
    }


    const contextValue = {
        isAuthenticated: userData.isAuthenticated,
        username: userData.username,
        email: userData.email,
        publicKeyServerArmored: userData.publicKeyServerArmored,
        privateKey: userData.privateKey,
        publicKey: userData.publicKey,
        isMember,
        setIsMember,
        showError,
        errorMessage,
        signup,
        login,
        logout,
    };

    return (<AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>)
}
const useAuth = () => useContext(AuthContext);
export {AuthProvider, useAuth};
