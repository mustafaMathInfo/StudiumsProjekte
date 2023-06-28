import * as yup from "yup";

const InputFieldSchema = yup.object({
    username: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username can be at most 20 characters')
        .trim()
        .required('Username is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
});

export default InputFieldSchema
