import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/index'; // Import your GET_USER query

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    if (data && data.getUser) {
      setUserData(data.getUser); // Set user data if available
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Dashboard</h2>
        {userData ? (
          <div>
            <p className="text-gray-800">Welcome, {userData.name}!</p>
          </div>
        ) : (
          <p className="text-gray-800">Welcome!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
