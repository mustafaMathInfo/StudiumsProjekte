import mongoose from 'mongoose'
import validator from "validator";

const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide Name of Website"],
            minLength: [3, "Your first name should more as 3 Character"],
            maxLength: 20,
            trim: true,
            unique: [true, "name already taken"]

        },
        email: {
            type: String,
            required: [true, "Please provide the user email address"],
            validate: {
                validator: validator.isEmail,
                message: 'Please provide a valid email'
            },
        },
        password: {
            type: String,
            required: [true, "Please provide password"],
            minLength: [6, "The Password should more as 6 Character"],
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, "Please provide user"],
            select: false
        },
    }, {timestamps: true}
);
export default mongoose.model("Item", ItemSchema);
