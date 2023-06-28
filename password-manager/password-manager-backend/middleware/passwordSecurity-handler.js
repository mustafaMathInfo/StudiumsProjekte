import User from "../models/User.js";
import {BadRequestError} from "../errors/index.js";
import {decryptBeiAES, encryptBeiAES} from "../security/encryptionUtils.js";
import {decryptPasswordWithPrivateKey, verifyMessageWithPublicKey} from "../security/clientToServer.js";

const passwordSecurityHandler = async (req, res, next) => {
    const {encryptedMessage, detachedSignature, publicKeyArmoredSign, userId} = req.body;

    if (!encryptedMessage || !detachedSignature || !publicKeyArmoredSign) {
        throw new BadRequestError(`Please provide all values`);
    }

    const user = await User.findById(userId).select('+privateKey')

    if (!user) {
        throw new BadRequestError(`user not found for ID: ${userId}`);
    }

    const {privateKey, publicKey, email} = user
    const privateKeyArmored = decryptBeiAES(privateKey)
    const publicKeyArmored = decryptBeiAES(publicKey)
    const decryptedPassword = await decryptPasswordWithPrivateKey(encryptedMessage, privateKeyArmored, publicKeyArmored, email)
    const isValidPassword = await verifyMessageWithPublicKey(decryptedPassword, detachedSignature, publicKeyArmoredSign)
    if (isValidPassword) {
        req.body.password = encryptBeiAES(decryptedPassword)
        next()
    } else {
        throw new Error('signature could not be verified');
    }

};

export default passwordSecurityHandler;

