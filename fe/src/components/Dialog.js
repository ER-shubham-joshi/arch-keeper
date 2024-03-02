import React from 'react'
import Button from './Button'

const Dialog = ({ buttonIcon1, buttonIcon2, buttonFunc1, buttonFunc2, dialogText, buttonBorderColor1, buttonBorderColor2 }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-90 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg text-white shadow-lg transform transition-transform duration-300">
                <p className="text-md overflow-hidden overflow-ellipsis">{dialogText}</p>
                <div className="flex justify-end mt-4">
                    <Button borderColor={buttonBorderColor1} icon={buttonIcon1} onClick={buttonFunc1} />
                    <Button borderColor={buttonBorderColor2} icon={buttonIcon2} onClick={buttonFunc2} />
                </div>
            </div>
        </div>
    )
}
Dialog.defaultProps = {
    buttonIcon1: '',
    buttonIcon2: '',
    buttonFunc1: () => { },
    buttonFunc2: () => { },
    dialogText: '',
    buttonBorderColor1: 'white',
    buttonBorderColor2: 'white'
}
export default Dialog
