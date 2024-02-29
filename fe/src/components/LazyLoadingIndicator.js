import React from 'react';

const LazyLoadingIndicator = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
            <div className="animate-bounce">
                <div className="flex items-center">
                    <div className="h-12 w-12 bg-white rounded-full mr-2"></div>
                    <div className="h-12 w-12 bg-white rounded-full mr-2"></div>
                    <div className="h-12 w-12 bg-white rounded-full"></div>
                </div>
            </div>
        </div>
    );
}

export default LazyLoadingIndicator;
