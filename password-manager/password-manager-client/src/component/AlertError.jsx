import React from 'react';

const AlertError = ({showAlert, alertText}) => {
    return (
        <>
            {showAlert &&
                <div className='w-full flex justify-center mb-4'>
                    <label className='text-red-500 text-center border p-2 rounded w-full border-red-500'>
                        {alertText}
                    </label>
                </div>}
        </>

    );
};

export default AlertError;
