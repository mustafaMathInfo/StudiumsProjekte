import React from 'react';
import classNames from 'classnames'

const Button = ({children,  className}) => {
    const finalClassNames = classNames(
        'bg-cyan-500 text-white px-4 py-2 mt-5 border-none rounded-md',
        className
    )
    return (
        <button className={finalClassNames}>{children}</button>
    );
};

export default Button;
