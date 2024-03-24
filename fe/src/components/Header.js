//Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Avatar from './Avatar'

const Header = () => {
    return (
        <header className="mx-auto w-screen flex items-center justify-around p-4 bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-md border-b-2 border-gray-700">
            <div>
                <Link to="/" className="text-white">
                    <FontAwesomeIcon icon={faHome} className="w-8 h-8" />
                </Link>
            </div>
            <div>
                <h1 className="animate-pulse text-4xl font-century-gothic text-white">ARCH KEEPER</h1>
            </div>
            <div>
                <Avatar />
            </div> {/* You can add any other elements you want on the right side */}
        </header >
    );
}

export default Header;
