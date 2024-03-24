import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';

const Projects = ({ clientId }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (formData) => {
        try {
            const newProject = {
                id: Date.now(), // Generate a unique ID (you may want to use a more reliable method)
                name: formData.projectName,
                description: formData.projectDescription
            };
            setProjects([...projects, newProject]); // Add new project to projects array
            setShowAddForm(false); // Hide the add project form
            reset(); // Reset the form fields
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handlePlusClick = () => {
        setShowAddForm(true); // Show the add project form
    };

    const handleCloseClick = () => {
        setShowAddForm(false); // Hide the add project form
        reset(); // Reset the form fields
    };

    return (

        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />

            <div className="flex-grow">
                <div className="p-4">
                    <div className="flex flex-wrap justify-start"> {/* Adjusted justify-start */}
                        {!showAddForm ? (
                            <div
                                className={`cursor-pointer mx-4 my-4 w-52 h-52 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center relative transition duration-500 transform`}
                                onClick={handlePlusClick}
                            >
                                <FontAwesomeIcon icon={faPlus} className="text-white text-2xl" />
                            </div>
                        ) : (
                            <div className="cursor-pointer mx-4 my-4 w-52 h-52 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center relative">
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center h-full">
                                    <div className="mb-4 w-full px-4">
                                        <input {...register("projectName", { required: true })} type="text" placeholder="Project Name" className="mt-1 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black pl-2 pr-2 h-10" />
                                        {errors.projectName && <span className="text-red-500">This field is required</span>}
                                    </div>
                                    <div className="mb-4 w-full px-4">
                                        <input {...register("projectDescription", { required: true })} type="text" placeholder="Project Description" className="mt-1 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black pl-2 pr-2 h-10" />
                                        {errors.projectDescription && <span className="text-red-500">This field is required</span>}
                                    </div>
                                    <div className="flex justify-center w-full">
                                        <Button type="submit" icon={faSave} borderColor="green" />
                                        <Button icon={faTimesCircle} borderColor="red" onClick={handleCloseClick} />
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Render tiles for each project */}
                        {projects.map((project) => (
                            <Link key={project.id} to={`/project/${project.id}`} className="cursor-pointer mx-4 my-4 w-52 h-52 p-8 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-gray-700 transition duration-300">
                                <span>{project.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Projects;
