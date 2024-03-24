import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import Header from '../components/Header'; // Import Header component
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/index';
import Loader from '../components/Loader';

const Signup = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Use useNavigate hook instead of useHistory
    const [errorPopup, setErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const userType = location.state && location.state.userType;
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [createUser, { data, loading }] = useMutation(CREATE_USER, {
        onError: (error) => {
            console.error('ApolloError during registration:', error);
            setErrorPopup(true);
            setErrorMessage(error.message);
        }
    });

    // Redirect to login page on successful registration
    useEffect(() => {
        if (data) {
            navigate('/login', { state: { userType } });
        }
    }, [data, navigate, userType]);

    // Handle form submission
    const onSubmit = (formData) => {
        const avatarName = formData?.avatar[0]?.name; // Extract avatar name
        createUser({ variables: { ...formData, avatar: avatarName, scope: [userType] } }); // Call mutation to create user
    };

    // Close error popup
    const closePopup = () => {
        setErrorPopup(false);
        setErrorMessage('');
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <Header /> {/* Include Header component */}
            <div className="flex flex-col justify-center items-center flex-grow">
                <div className="bg-gray-800 rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-4 text-center">{userType.toUpperCase()} SIGN UP</h2>
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        {/* Name Input */}
                        <div className="mb-4">
                            <input
                                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Name"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <p className="text-red-500 text-xs italic">Name is required</p>}
                        </div>
                        {/* Email Input */}
                        <div className="mb-4">
                            <input
                                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
                        </div>
                        {/* Password Input */}
                        <div className="mb-4">
                            <input
                                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
                        </div>
                        {/* Avatar Input */}
                        <div className="mb-6">
                            <label htmlFor="avatar" className="block text-gray-300 text-sm font-bold mb-2">Avatar</label>
                            <input
                                className="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="avatar"
                                type="file"
                                placeholder="Avatar"
                                {...register("avatar")}
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            className="bg-gray-600 border border-gray-900 hover:bg-gray-900 hover:shadow-md text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                    {/* Error Popup */}
                    {errorPopup && (
                        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 z-50">
                            <div className="relative bg-red-600 text-white rounded-lg shadow-lg p-4">
                                <div className="absolute top-0 right-0 -mt-3 -mr-3 flex items-center justify-center h-8 w-8 bg-black rounded-full cursor-pointer" onClick={closePopup}>
                                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </div>
                                <p>{errorMessage}</p>
                            </div>
                        </div>

                    )}
                    {/* Login Link */}
                    <div className="text-center mt-4">
                        <p className="text-gray-300">Already have an account? <Link to="/login" state={{ userType }} className="text-blue-500">Login here</Link></p>
                    </div>
                </div>
            </div>
            {/* Loader */}
            {loading && <Loader />}
        </div>
    );
}

export default Signup;
