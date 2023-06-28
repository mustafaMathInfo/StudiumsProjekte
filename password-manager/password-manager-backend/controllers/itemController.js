import {StatusCodes} from "http-status-codes";
import Item from "../models/Item.js";
import User from "../models/User.js";
import {BadRequestError, NotFoundError} from "../errors/index.js";
import {decryptBeiAES} from "../security/encryptionUtils.js";
import {encryptPasswordWithPublicKey, signMessageWithKeyPair} from "../security/serverToClient.js";


export const registerItem = async (req, res) => {
    const createdItem = await Item.create(req.body)

    const item = await responseItem(createdItem, req.body.userId)
    res.status(StatusCodes.CREATED).json(item);
};

export const getItems = async (req, res) => {
    const data = await Item.find({userId: req.body.userId}).lean()
    if (!data) {
        throw new BadRequestError(`items not found `);
    }
    const processedData = await Promise.all(
        data.map((item) => responseItem(item, req.body.userId))
    );
    res.status(StatusCodes.OK).json(processedData)
};

export const getItem = async (req, res) => {
    const itemId = req.params;
    const {userId} = req.body
    const item = await Item.findOne({userId, _id: itemId})
    if (!item) {
        throw new BadRequestError(`Item not found for ID: ${itemId}`);
    }
    res.status(StatusCodes.OK).json(await responseItem(item, req.body.userId));
};

export const updateItem = async (req, res) => {
    const itemId = req.params.id;
    const {name, password, email, userId} = req.body
    if (!name || !password || !email) {
        throw new BadRequestError('Please provide all values')
    }
    const updatedItem = await Item.findOneAndUpdate(
        {userId, _id: itemId},
        {name, password, email},
        {new: true}
    ).exec();
    if (!updatedItem) {
        throw new NotFoundError(`Item not found for ID: ${itemId}`);
    }
    const item = await responseItem(updatedItem, req.body.userId)
    res.status(StatusCodes.OK).json(item);
};

export const deleteItem = async (req, res) => {
    const itemId = req.params.id;
    const {userId} = req.body
    const item = await Item.findOneAndDelete({userId, _id: itemId})
    if (!item) {
        throw new NotFoundError(`Item not found for ID: ${itemId}`);
    }
    const deletedItem = await responseItem(item, req.body.userId)
    res.status(StatusCodes.OK).json(deletedItem);
};

const responseItem = async (item, userId) => {
    const user = await User.findById(userId)
    if (!user || !user.publicKeyClient) {
        throw new NotFoundError(`User not found for ID: ${userId}`);
    }
    const decryptedPasswordBeiAES = decryptBeiAES(item.password);
    const decryptedPublicKeyClient = decryptBeiAES(user.publicKeyClient)
    const encryptedPassword = await encryptPasswordWithPublicKey(decryptedPasswordBeiAES, decryptedPublicKeyClient)

    const {detachedSignature, publicKeyArmoredSign} = await signMessageWithKeyPair(decryptedPasswordBeiAES, item.email)
    return {
        id: item._id,
        name: item.name,
        email: item.email,
        password: encryptedPassword,
        detachedSignature: detachedSignature,
        publicKeyArmoredSign: publicKeyArmoredSign
    };
}
