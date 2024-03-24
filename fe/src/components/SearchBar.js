import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="flex items-center bg-gray-800 rounded-md">
            <input
                type="text"
                onChange={onSearch}
                placeholder="Search..."
                className="bg-gray-100 text-gray-800 rounded-l-md py-2 px-4 focus:outline-none w-full"
            />
            <button
                onClick={onSearch}
                className="bg-gray-800 text-white rounded-r-md py-2 px-4 hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center"
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
};

export default SearchBar;