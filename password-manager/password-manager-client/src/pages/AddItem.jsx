import React from 'react';
import ItemForm from "../component/ItemForm.jsx";
import {useNavigate} from "react-router-dom";
import {useItem} from "../context/itemContext.jsx";

const AddItem = () => {
    const navigate = useNavigate()
    const {createItem} = useItem()
    const handleAddItem = (data) => {
        createItem(data)
        navigate("/home");
    };

    return (
        <div className='pt-24'>
            <div className='flex justify-center items-center'>
                <p className='text-2xl font-medium text-cyan-500'>Add Password</p>
            </div>
            <ItemForm onSubmit={handleAddItem}></ItemForm>
        </div>
    );
};

export default AddItem;
