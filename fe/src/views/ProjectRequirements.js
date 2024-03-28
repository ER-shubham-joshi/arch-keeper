import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';

const ProjectRequirements = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className='flex flex-col p-4'>
            <div className="bg-gray-800 text-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">REQUIREMENTS</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Standard Requirements */}
                    <fieldset className="mb-8">
                        <legend className="text-lg font-bold mb-2">Standard Requirements</legend>
                        <label className="block mb-2">Client Name:</label>
                        <input type="text" {...register('clientName', { required: true })} className="bg-gray-100 text-gray-800 px-4 py-2 mb-4 rounded-md w-full" placeholder="Enter client name" />
                        {errors.clientName && <span className="text-red-500 block mb-2">This field is required</span>}

                        <label className="block mb-2">Client Background:</label>
                        <textarea {...register('clientBackground', { required: true })} className="bg-gray-100 text-gray-800 px-4 py-2 mb-4 rounded-md w-full" placeholder="Enter client background"></textarea>
                        {errors.clientBackground && <span className="text-red-500 block mb-2">This field is required</span>}

                        <label className="block mb-2">W orked with Architect Before?</label>
                        <div className='mb-2'>
                            <input type="radio" value="yes" {...register('workedWithArchitect', { required: true })} className="mr-2" /> Yes
                            <input type="radio" value="no" {...register('workedWithArchitect', { required: true })} className="ml-4 mr-2" /> No
                        </div>
                        {errors.workedWithArchitect && <span className="text-red-500 block mb-2">This field is required</span>}

                        <label className="block mb-2">Prior Knowledge of Construction?</label>
                        <div className='mb-2'>
                            <input type="radio" value="yes" {...register('priorKnowledge', { required: true })} className="mr-2" /> Yes
                            <input type="radio" value="no" {...register('priorKnowledge', { required: true })} className="ml-4 mr-2" /> No
                        </div>
                        {errors.priorKnowledge && <span className="text-red-500 block mb-2">This field is required</span>}

                        <label className="block mb-2">Project Typology:</label>
                        <select {...register('projectTypology', { required: true })} className="bg-gray-100 text-gray-800 px-4 py-2 mb-4 rounded-md w-full">
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="mixed">Mixed</option>
                        </select>
                        {errors.projectTypology && <span className="text-red-500 block mb-2">This field is required</span>}

                        <label className="block mb-2">Area of Project (in sqft):</label>
                        <input
                            type="number"
                            {...register('projectArea', {
                                required: 'Area of Project is required',
                                min: {
                                    value: 1,
                                    message: 'Area of Project must be greater than 0',
                                }
                            })}
                            className="bg-gray-100 text-gray-800 px-4 py-2 mb-4 rounded-md w-full"
                            placeholder="Enter project area in sqft"
                        />
                        {errors.projectArea && (
                            <span className="text-red-500 block mb-2">
                                {errors.projectArea.message}
                            </span>
                        )}

                        <label className="block mb-2">Fund Allocation (Rs.):</label>
                        <input
                            type="number"
                            {...register('budget', {
                                required: 'This field is required',
                                min: {
                                    value: 1,
                                    message: "Fund allocation must be greater than 0",
                                },
                            })}
                            className="bg-gray-100 text-gray-800 px-4 py-2 mb-4 rounded-md w-full"
                            placeholder="Enter fund allocation in Rs."
                        />
                        {errors.budget && (
                            <span className="text-red-500 block mb-2">{errors.budget.message ? errors.budget.message : 'This field is required'}</span>
                        )}

                        <label className="block mb-2">Location of Project (Coordinates or Google Maps Link):</label>
                        <input type="text" {...register('location', { required: true })} className="bg-gray-100 text-gray-800 px-4 py-2 mb-4 rounded-md w-full" placeholder="Enter location or Google Maps link" />
                        {errors.location && <span className="text-red-500 block mb-2">This field is required</span>}

                        <label className="block mb-2">Mobile Number:</label>
                        <input
                            type="tel"
                            {...register('mobileNumber', {
                                required: "Mobile number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Invalid mobile number"
                                }
                            })}
                            className={`bg-gray-100 text-gray-800 px-4 py-2 mb-4 rounded-md w-full ${errors.mobileNumber ? 'border-red-500' : ''}`}
                            placeholder="Enter mobile number"
                        />
                        {errors.mobileNumber && <span className="text-red-500 block mb-2">{errors.mobileNumber.message}</span>}
                    </fieldset>

                    {/* Form Based Requirements */}
                    {/* <fieldset className="mb-8">
                        <legend className="text-lg font-bold mb-2">Form Based Requirements</legend>

                    </fieldset> */}

                    {/* Special Demands */}
                    <fieldset className="mb-8">
                        <legend className="text-lg font-bold mb-2">Specific Requirements</legend>
                        <label className="block mb-2">Specific Comments or Requirements:</label>
                        <textarea {...register('comments')} className="bg-gray-100 text-gray-800 px-4 py-2 mb-4 rounded-md w-full" placeholder="Enter specific comments or requirements"></textarea>
                    </fieldset>

                    <Button borderColor='green' type='submit' buttonText='Submit' />
                </form>
            </div>
        </div>
    );
}

export default ProjectRequirements;
