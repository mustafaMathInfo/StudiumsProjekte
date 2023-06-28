import React from 'react';
import ItemForm from "../component/ItemForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useItem} from "../context/itemContext.jsx";

const EditItem = () => {
    const {editItemById} = useItem()
    const {itemId} = useParams()
    const navigate = useNavigate()
    const submitHandler = (date) => {
        editItemById({
            ...date,
            id: itemId
        })
        navigate("/home");

    };

    return (
        <div className='pt-24'>
            <div className='flex justify-center items-center'>
                <p className='text-2xl font-medium text-cyan-500'>Edit Password</p>
            </div>
            <ItemForm onSubmit={submitHandler}></ItemForm>
        </div>
    );
};

export default EditItem;
