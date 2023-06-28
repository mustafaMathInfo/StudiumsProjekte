import React from 'react';
import recipeError from '../assets/images/error-page.svg'
import {Link} from "react-router-dom";
const Error = () => {
    return (
        <div>
            <img src={recipeError} alt="Recipe-Error" className='mx-auto pt-24'/>
           <h1 className='text-center text-4xl my-10'>Page Not Found</h1>
            <button className='bg-cyan-500 text-white px-4 py-2 border-none rounded-md mx-auto flex justify-center'><Link to={'/'} className='text-xl'>back to home</Link></button>
        </div>
    );
};

export default Error;
