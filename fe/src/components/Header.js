// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-10 bg-gray-800 backdrop-filter backdrop-blur-lg border-b-2 border-gray-700">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div>
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} className="w-6 h-6 text-white" />
                    </Link>
                </div>
                <h1 className="animate-pulse text-4xl font-heading font-medium text-white">ARCH KEEPER</h1>
                <div></div> {/* You can add any other elements you want on the right side */}
            </div>
        </header>
    );
}

export default Header;
