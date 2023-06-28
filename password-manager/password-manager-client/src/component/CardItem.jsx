import React from 'react';
import {useNavigate} from "react-router-dom";
import {useItem} from "../context/itemContext.jsx";

const CardItem = (props) => {
    const navigate = useNavigate()
    const {deleteItemById} = useItem()
    const handleDelete = () => {
        deleteItemById(props.itemId)
    }

    const handleUpdate = () => {
        navigate(`/edit/${props.itemId}`)
    }

    return (
        <div className='p-4 border-2 border-t-cyan-500 rounded shadow-2xl bg-white w-96 h-60 mx-4'>
            <h3 className='mb-4'>Name: {props.name}</h3>
            <p className='mb-4'>Email: {props.email}</p>
            <p className='mb-4'>Password: {props.password}</p>
            <div className='flex justify-end'>
                <button onClick={handleUpdate} className='bg-cyan-500 hover:bg-cyan-600 px-4 rounded-md me-2 text-white p-2'>
                    Edit
                </button>
                <button onClick={handleDelete} className='bg-red-500 hover:bg-red-600 rounded-md me-2 text-white p-2'>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CardItem;
