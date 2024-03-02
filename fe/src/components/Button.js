import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ icon, borderColor, type, focus, className, onClick }) => {
    return (
        <button onClick={onClick} type={type} className={`bg-gray-900 text-white px-3 py-2 m-2 rounded-md focus:outline-none focus:${focus} focus:border-blue-300 hover:border-${borderColor} border-gray-900 border-2 ${className}`}>
            <FontAwesomeIcon icon={icon} />
        </button>
    )
}
Button.defaultProps = {
    borderColor: 'gray',
    type: 'button',
    focus: 'ring',
    className: '',
    onClick: () => { }
};
export default Button