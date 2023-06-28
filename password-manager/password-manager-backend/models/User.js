import mongoose from 'mongoose'
import validator from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide your first Name"],
            minLength: [3, "Your first name should more as 3 Character"],
            maxLength: 20,
            trim: true,
            unique: [true, "Username already taken"]

        },
        email: {
            type: String,
            required: [true, "Please provide the user email address"],
            validate: {
                validator: validator.isEmail,
                message: 'Please provide a valid email'
            },
            unique: [true, "Email address already taken"],
        },
        password: {
            type: String,
            required: [true, "Please provide user password"],
            minLength: [6, "Your Password should more as 6 Character"],
            select: false
        },
        privateKey: {
            type: String,
            required: [true, "Please provide Private Key"],
            select: false
        },
        publicKey: {
            type: String,
            required: [true, "Please provide Public Key"],
        },
        publicKeyClient: {
            type: String,
        },
    },
);

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        {userId: this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}
export default mongoose.model("User", UserSchema);
