import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InputField from "./InputField.jsx";
import Button from "./Button.jsx";

const InputFieldSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, 'Name of Website must be at least 3 characters')
        .max(20, 'Username can be at most 20 characters')
        .trim()
        .required('Name of Website is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .trim()
        .required('Password is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
});

const ItemForm = (props) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(InputFieldSchema),
    });

    const submitHandler = (date) => {
        props.onSubmit(date)
        reset()
    }

    return (
        <div className="pt-4">
            <form onSubmit={handleSubmit(submitHandler)}
                  className='max-w-md mx-auto p-8 border-2 border-t-cyan-500 shadow-2xl bg-white'>
                <InputField
                    name='name'
                    label='Name'
                    register={register}
                    errors={errors}
                    errorMs={errors.name?.message}>
                </InputField>
                <InputField
                    name='email'
                    label='Email'
                    register={register}
                    errors={errors}
                    errorMs={errors.email?.message}>
                </InputField>
                <InputField
                    name='password'
                    label='Password'
                    register={register}
                    errors={errors}
                    errorMs={errors.password?.message}>
                </InputField>
                <Button className='w-full'>Send</Button>
            </form>
        </div>
    );
};

export default ItemForm;
