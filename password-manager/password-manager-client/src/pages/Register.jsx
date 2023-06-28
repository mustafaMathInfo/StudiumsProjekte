import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import InputField from "../component/InputField.jsx";
import Button from "../component/Button.jsx";
import passwordLogo from "../assets/images/password-logo.png";
import AlertError from "../component/AlertError.jsx";
import {useAuth} from "../context/authContext.jsx";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";


const Register = () => {
    const {signup, login, isAuthenticated, isMember, setIsMember, showError, errorMessage} = useAuth()
    const navigate = useNavigate()

    const InputFieldSchema = yup.object().shape({
        username: yup
            .string()
            .test('isMemberCheck', 'Username is required', function (value) {
                // Check if isMember is true, return true without validation
                if (isMember) {
                    return true;
                }
                // Otherwise, perform the username validation
                return yup
                    .string()
                    .min(3, 'Username must be at least 3 characters')
                    .max(20, 'Username can be at most 20 characters')
                    .trim()
                    .isValidSync(value);
            }),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
    });
    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(InputFieldSchema),
    });

    const toggleMember = () => {
        setIsMember(!isMember)
    }
    const onSubmit = (data) => {
        if (isMember) {
            login(data)
        } else {
            signup(data)
        }
        reset()
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home')
        }
    }, [isAuthenticated, navigate])
    return (
        <div className="pt-24">
            <form onSubmit={handleSubmit(onSubmit)}
                  className='max-w-md mx-auto p-8 border-2 border-t-cyan-500 shadow-2xl bg-white'>
                <div className='flex justify-center items-center'>
                    <img src={passwordLogo} alt="Recipe-Logo" className='w-14 h-14 me-5 rounded-full'/>
                    <p className='text-2xl font-medium text-cyan-500'>Password Manager</p>
                </div>
                <p className='text-black text-center text-2xl font-medium my-4'>
                    {!isMember && "Register" || isMember && 'Login'}
                </p>
                <AlertError
                    showAlert={showError}
                    alertText={errorMessage}>
                </AlertError>
                {!isMember &&
                    <InputField
                        name='username'
                        label='Username'
                        register={register}
                        errors={errors}
                        errorMs={errors.username?.message}>
                    </InputField>}
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
                <Button onClick={onSubmit} className='w-full'>Submit</Button>
                {!isMember &&
                    <p className='text-black mt-4 font-medium text-sm text-center'>Already have account?
                        <span className='text-cyan-500' onClick={toggleMember}> Login</span>
                    </p>}
                {isMember &&
                    <p className='text-black mt-4 font-medium text-sm text-center'>Not a member
                        <span className='text-cyan-500' onClick={toggleMember}> Register</span>
                    </p>}
            </form>
        </div>
    );
};

export default Register;
