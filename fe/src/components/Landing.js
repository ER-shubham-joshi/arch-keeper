// Landing.js

import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="flex justify-center">
          <Link to="/login" state={{ userType: "architect" }} className="cursor-pointer mx-4 w-52 h-52 p-8 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-gray-700 transition duration-300">
            <span>Architect Login</span>
            <FontAwesomeIcon icon={faChevronCircleRight} className="text-white text-xl mt-2" />
          </Link>
          <Link to="/login" state={{ userType: "client" }} className="cursor-pointer mx-4 w-52 h-52 p-8 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-gray-700 transition duration-300">
            <span>Client Login</span>
            <FontAwesomeIcon icon={faChevronCircleRight} className="text-white text-xl mt-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
