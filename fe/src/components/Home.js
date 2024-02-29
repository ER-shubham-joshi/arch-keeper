import React, { useState } from 'react';
import Header from './Header';
import Clients from './Clients';
import Projects from './Projects';

const Home = () => {
    const [selectedTab, setSelectedTab] = useState('Clients');

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />

            {/* Tab Section */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-md shadow-lg py-4 pl-4">
                <ul className="flex flex-col md:flex-row md:space-x-4">
                    <li
                        className={`cursor-pointer hover:bg-gray-700 p-2 rounded-md ${selectedTab === 'Clients' && 'bg-gray-700'
                            }`}
                        onClick={() => setSelectedTab('Clients')}
                    >
                        Clients
                    </li>
                    <li
                        className={`cursor-pointer hover:bg-gray-700 p-2 rounded-md ${selectedTab === 'Projects' && 'bg-gray-700'
                            }`}
                        onClick={() => setSelectedTab('Projects')}
                    >
                        Projects
                    </li>
                </ul>
            </div>

            {/* Detail Section */}
            <div className="flex-grow">
                {selectedTab === 'Clients' && <Clients />}
                {selectedTab === 'Projects' && <Projects />}
            </div>
        </div>
    );
};

export default Home;
