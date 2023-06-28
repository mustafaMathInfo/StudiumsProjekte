const InputField = ({ name, label, register, errors, errorMs }) => {
    return (
        <div className='mb-4'>
            <label className='block mb-2 text-black' htmlFor={name}>
                {label}
            </label>
            <input
                type='text'
                id={name}
                {...register(name)}
                className={`border p-2 rounded w-full ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors[name] && <p className='text-red-500'>{errorMs}</p>}
        </div>
    );
};

export default InputField
