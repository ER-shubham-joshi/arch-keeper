// ChatBox.js
import React, { useState } from 'react';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleMessageSend = () => {
        if (newMessage.trim() === '') return;
        const updatedMessages = [...messages, { text: newMessage, sender: 'user' }];
        setMessages(updatedMessages);
        setNewMessage('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleMessageSend();
        }
    };

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex-1 px-4 py-2 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className={`flex mb-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            <div className="px-4 py-2">{message.text}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
                <input
                    type="text"
                    className="flex-1 mr-2 border rounded-full px-4 py-2 focus:outline-none"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
                    onClick={handleMessageSend}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
