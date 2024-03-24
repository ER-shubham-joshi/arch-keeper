import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSave, faTimesCircle, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import Dialog from '../components/Dialog';

const Clients = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [clients, setClients] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [hoveredClient, setHoveredClient] = useState(null);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [selectClient, setSelectedClient] = useState(null);

    const setClientOnClickDelete = (event, client) => {
        event.preventDefault();
        setSelectedClient(client);
        openConfirmationDialog();
    };

    const confirmDeleteClient = () => {
        setClients(clients.filter((clnt) => clnt.id !== selectClient.id));
        closeConfirmationDialog();
    };

    const openConfirmationDialog = () => {
        setShowConfirmationDialog(true);
    };

    const closeConfirmationDialog = () => {
        setShowConfirmationDialog(false);
    };


    const handleMouseEnter = (client) => {
        setHoveredClient(client);
    };

    const handleMouseLeave = () => {
        setHoveredClient(null);
    };

    const onSubmit = async (formData) => {
        try {
            const newClient = {
                id: Date.now(),
                name: formData.clientName,
                email: formData.clientEmail
            };
            setSelectedClient(null);
            setClients([...clients, newClient]);
            setShowAddForm(false);
            reset();
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    const handlePlusClick = () => {
        setShowAddForm(true);
    };

    const handleCloseClick = () => {
        setShowAddForm(false);
        reset();
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap justify-start">
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

                {clients.map((client) => (
                    <Link
                        key={client.id}
                        to={`/client/${client.id}`}
                        onMouseEnter={() => handleMouseEnter(client)}
                        onMouseLeave={handleMouseLeave}
                        className="cursor-pointer mx-4 my-4 w-52 h-52 p-8 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center text-center hover:bg-gray-700 transition duration-300"
                    >
                        <div>{client.name}</div>
                        <div>
                            {hoveredClient?.id === client.id && (
                                <Button borderColor='red' icon={faTrash} onClick={(event) => setClientOnClickDelete(event, client)} />
                            )}
                        </div>
                    </Link>
                ))}
                <div className={`${showConfirmationDialog ? '' : 'hidden'}`}>
                    {showConfirmationDialog && (
                        <Dialog buttonFunc1={confirmDeleteClient} buttonFunc2={closeConfirmationDialog} buttonIcon1={faCheck} buttonIcon2={faTimes} dialogText={`Are you sure you want to delete this client "${selectClient?.name}" ? All the data related to this client will be deleted.`} buttonBorderColor1='red' buttonBorderColor2='green' />
                    )}
                </div>
            </div>
        </div >
    );
};

export default Clients;