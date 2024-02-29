import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header className="bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-md border-b-2 border-gray-700">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div>
                    <Link to="/" className="text-white">
                        <FontAwesomeIcon icon={faHome} className="w-8 h-8" />
                    </Link>
                </div>
                <h1 className="text-2xl font-semibold text-white">ARCH KEEPER</h1>
                <div></div> {/* You can add any other elements you want on the right side */}
            </div>
        </header>
    );
}

export default Header;
