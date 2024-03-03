import React, { useState } from 'react';
import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import { faPlus, faSave, faTrash, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import Dialog from '../components/Dialog';

const Project = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [addingCategory, setAddingCategory] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const onSubmit = (data) => {
        const newCategory = { name: data.categoryName, id: Date.now() };
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setAddingCategory(false);
        reset();
    };

    const addCategory = () => {
        setAddingCategory(true);
        setSelectedCategory(null);
    };

    const cancelCategory = () => {
        setAddingCategory(false);
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
    };

    const openConfirmationDialog = () => {
        setShowConfirmationDialog(true);
    };

    const closeConfirmationDialog = () => {
        setShowConfirmationDialog(false);
        setSelectedCategory(null); // Reset selectedCategory after the confirmation dialog is closed
    };

    const deleteCategory = (category) => {
        openConfirmationDialog();
        // Store the category to be deleted in the state
        // Handle the actual deletion in confirmDeleteCategory function
        setSelectedCategory(category);
    };

    const confirmDeleteCategory = () => {
        // Handle category deletion here
        setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== selectedCategory.id));
        closeConfirmationDialog();
    };

    return (
        <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
            <Header />
            <div className='flex flex-grow'>
                <aside className='flex flex-col lg:w-1/5 md:w-1/4 sm:w-1/3 bg-gray-800 bg-opacity-90 border-r-2 border-gray-700'>
                    <div className='flex justify-center border-gray-700 border-y-2'>
                        {addingCategory ? (
                            <form className='flex flex-col items-center space-y-2 p-2 m-auto' onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    type='text'
                                    {...register('categoryName', { required: true, pattern: /^.*\S.*$/ })}
                                    className='bg-gray-100 text-gray-800 p-2 rounded-md w-full focus:outline-none'
                                    placeholder='Category Name'
                                />
                                {errors.categoryName && (
                                    <div className="text-red-500 items-center p-2 m-auto">
                                        {errors.categoryName.type === 'required' && 'Category Name is required'}
                                        {errors.categoryName.type === 'pattern' && 'Category Name cannot be whitespace only'}
                                    </div>
                                )}
                                <div className='flex space-x-2'>
                                    <Button type='submit' borderColor='green-900' icon={faSave} />
                                    <Button borderColor='red-900' icon={faTimes} onClick={cancelCategory} />
                                </div>
                            </form>
                        ) : <Button borderColor='white' icon={faPlus} onClick={addCategory} />}
                    </div>
                    <div className='flex flex-col justify-center overflow-y-auto'>
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className={`flex items-center justify-evenly border-y-2 border-gray-700 cursor-pointer p-2 ${selectedCategory?.id === category.id ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
                                    } text-center`}
                                onClick={() => selectCategory(category)}
                            >
                                <div className="text-center overflow-hidden overflow-ellipsis w-24">{category.name}</div>
                                <Button borderColor='red-900' icon={faTrash} onClick={() => deleteCategory(category)} />
                            </div>
                        ))}
                    </div>
                    <div className={`${showConfirmationDialog ? '' : 'hidden'}`}>
                        {showConfirmationDialog && (
                            <Dialog buttonFunc1={confirmDeleteCategory} buttonFunc2={closeConfirmationDialog} buttonIcon1={faCheck} buttonIcon2={faTimes} dialogText={`Are you sure you want to delete the category "${selectedCategory?.name}"?`} buttonBorderColor1='red-900' buttonBorderColor2='green-900' />
                        )}
                    </div>
                </aside>

                <main className='flex-grow container mx-auto flex justify-center p-4'>
                    {selectedCategory && !showConfirmationDialog && (
                        <div>Content for {selectedCategory.name}</div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Project;
