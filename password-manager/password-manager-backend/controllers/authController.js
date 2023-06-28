import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError} from '../errors/index.js'
import Unauthenticated from "../errors/unauthenticated.js";
import {decryptBeiAES, encryptBeiAES} from "../security/encryptionUtils.js";
import generateKeyPair from "../security/generateKeyPair.js";

const register = async (req, res) => {
    const {username, email, password} = req.body
    const {privateKeyArmored, publicKeyArmored} = await generateKeyPair(email)
    const privateKey = encryptBeiAES(privateKeyArmored)
    const publicKey = encryptBeiAES(publicKeyArmored)

    const user = await User.create({
        username, email, password, privateKey, publicKey
    })

    res.status(StatusCodes.CREATED).json({
        username: user.username,
        token: user.createJWT(),
    })
};

const login = async (req, res) => {
    const {email, password, publicKeyClient} = req.body
    if (!email || !password || !publicKeyClient) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({email}).select('+password')
    if (!user) {
        throw new Unauthenticated('Email or Password not Correct')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new Unauthenticated('Email or Password not Correct')
    }

    await User.findOneAndUpdate(
        {email},
        {publicKeyClient: encryptBeiAES(publicKeyClient)}
    ).exec();

    const publicKeyArmored = decryptBeiAES(user.publicKey)

    res.status(StatusCodes.OK).json({
        username: user.username,
        email: user.email,
        token: user.createJWT(),
        publicKeyArmored: publicKeyArmored
    })
};

export {register, login}

