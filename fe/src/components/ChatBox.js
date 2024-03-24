// ChatBox.js
import React, { useState } from 'react';

const ChatBox = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [username, setUsername] = useState('Unknown');

    const handleCommentSubmit = () => {
        if (newComment.trim() === '') return;

        // Create a new comment object with the username and comment content
        const comment = { username, text: newComment };

        // Update the comments state with the new comment
        setComments([...comments, comment]);

        // Clear the input field
        setNewComment('');
    };

    return (
        <div className="mt-4">
            {/* Comment Input */}
            <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-2 bg-gray-800 text-white">
                <input
                    type="text"
                    className="flex-1 mr-2 border-none focus:outline-none bg-transparent text-white"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    className="text-blue-500 font-semibold"
                    onClick={handleCommentSubmit}
                >
                    Post
                </button>
            </div>

            {/* Comment List */}
            <div className="space-y-4">
                {comments.map((comment, index) => (
                    <div key={index} className="flex items-center space-x-2 text-white"> {/* Set text color to light */}
                        <span className="font-semibold">{comment.username}:</span>
                        <span>{comment.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatBox;
