import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import { useForm } from 'react-hook-form';

const Clients = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [clients, setClients] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (formData) => {
        try {
            const newClient = {
                id: Date.now(), // Generate a unique ID (you may want to use a more reliable method)
                name: formData.clientName,
                email: formData.clientEmail
            };
            setClients([...clients, newClient]); // Add new client to clients array
            setShowAddForm(false); // Hide the add client form
            reset(); // Reset the form fields
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    const handlePlusClick = () => {
        setShowAddForm(true); // Show the add client form
    };

    const handleCloseClick = () => {
        setShowAddForm(false); // Hide the add client form
        reset(); // Reset the form fields
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap justify-start"> {/* Adjusted justify-start */}
                {!showAddForm ? (
                    <div
                        className={`cursor-pointer mx-4 my-4 w-52 h-52 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center relative transition duration-500 transform`}
                        onClick={handlePlusClick}
                    >
                        <FontAwesomeIcon icon={faUserPlus} className="text-white text-2xl" />
                    </div>
                ) : (
                    <div className="cursor-pointer mx-4 my-4 w-52 h-52 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center relative">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center h-full">
                            <div className="mb-4 w-full px-4">
                                <input {...register("clientName", { required: true })} type="text" placeholder="Client Name" className="mt-1 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black pl-2 pr-2 h-10" />
                                {errors.clientName && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="mb-4 w-full px-4">
                                <input {...register("clientEmail", { required: true })} type="email" placeholder="Client Email ID" className="mt-1 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black pl-2 pr-2 h-10" />
                                {errors.clientEmail && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="flex justify-center w-full">
                                <Button type="submit" icon={faSave} borderColor="green" />
                                <Button icon={faTimesCircle} borderColor="red" onClick={handleCloseClick} />
                            </div>
                        </form>
                    </div>
                )}

                {/* Render tiles for each user */}
                {clients.map((client) => (
                    <div key={client.id} className="cursor-pointer mx-4 my-4 w-52 h-52 p-8 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-gray-700 transition duration-300">
                        <span>{client.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clients;
