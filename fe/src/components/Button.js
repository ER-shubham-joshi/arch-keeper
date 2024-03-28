import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hoverBorder } from '../styles'

const Button = ({ icon, borderColor, type, focus, buttonText, className, onClick }) => {
    return (
        <button onClick={onClick} type={type} className={`bg-gray-900 text-white px-3 py-2 m-2 rounded-md border-gray-900 border-2 focus:outline-none focus:border-blue-300 ${hoverBorder[borderColor]} focus:${focus} ${className}`}>
            {icon && <FontAwesomeIcon icon={icon} />} {buttonText}
        </button>
    )
}
Button.defaultProps = {
    borderColor: 'gray',
    type: 'button',
    focus: 'ring',
    className: '',
    buttonText: '',
    onClick: () => { }
};
export default Button