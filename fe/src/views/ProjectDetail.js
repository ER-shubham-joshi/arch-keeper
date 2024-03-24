import React, { useState } from 'react';
import Header from '../components/Header';
import Requirements from './Requirements';
import Designs from './Designs';
import Finances from './Finances';

const ProjectDetail = ({ projectId }) => {
    const [selectedTab, setSelectedTab] = useState('Requirements');

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />

            {/* Tab Section */}
            <div className="flex bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-md shadow-lg py-4 px-4">
                <ul className="flex flex-col md:flex-row md:space-x-4">
                    <li
                        className={`cursor-pointer hover:bg-gray-700 p-2 rounded-md ${selectedTab === 'Requirements' && 'bg-gray-700'
                            }`}
                        onClick={() => setSelectedTab('Requirements')}
                    >
                        Requirements
                    </li>
                    <li
                        className={`cursor-pointer hover:bg-gray-700 p-2 rounded-md ${selectedTab === 'Designs' && 'bg-gray-700'
                            }`}
                        onClick={() => setSelectedTab('Designs')}
                    >
                        Designs
                    </li>
                    <li
                        className={`cursor-pointer hover:bg-gray-700 p-2 rounded-md ${selectedTab === 'Finances' && 'bg-gray-700'
                            }`}
                        onClick={() => setSelectedTab('Finances')}
                    >
                        Finances
                    </li>
                </ul>
            </div>

            {/* Detail Section */}
            <div className='flex flex-grow'>
                {selectedTab === 'Requirements' && <Requirements />}
                {selectedTab === 'Designs' && <Designs />}
                {selectedTab === 'Finances' && <Finances />}
            </div>
        </div>
    );
};

export default ProjectDetail;
