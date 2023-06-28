import Unauthenticated from "../errors/unauthenticated.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Unauthenticated('Authenticated Invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = payload.userId
        next()
    } catch (error) {
        throw new Unauthenticated('Authenticated Invalid')
    }
}

export default auth;