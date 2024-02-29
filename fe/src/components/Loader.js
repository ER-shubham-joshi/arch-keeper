// Loading component

import React from 'react';
const Loader = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-20 w-20 border-t-8 border-b-8 border-gray-200"></div>
        </div>
    )
}
export default Loader;