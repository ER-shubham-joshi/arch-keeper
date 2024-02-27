import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleErrors = (error, errorInfo) => {
            // You can log the error or handle it in any way you want
            console.error('Error caught by Error Boundary:', error, errorInfo);
            setHasError(true);
        };

        window.addEventListener('error', handleErrors);

        return () => {
            window.removeEventListener('error', handleErrors);
        };
    }, []);

    if (hasError) {
        return (
            <div className="flex flex-col h-screen bg-gray-900 text-white items-center justify-center">
                <div className="animate-bounce text-4xl text-red-500">Error</div>
                <p className="text-2xl font-bold mb-4">Oops! Something went wrong.</p>
                <p className="text-gray-300">Please try again later.</p>
            </div>
        );
    }

    return children;
};

export default ErrorBoundary;