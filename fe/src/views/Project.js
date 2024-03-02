import React, { useState } from 'react';
import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';

const Project = () => {
    const { register, handleSubmit, reset } = useForm();
    const [addingCategory, setAddingCategory] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const onSubmit = (data) => {
        const newCategory = { name: data.categoryName, id: Date.now() };
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setAddingCategory(false);
        reset();
    };

    const addCategory = () => {
        setAddingCategory(true);
        setSelectedCategory(null); // Deselect any currently selected category
    };

    const toggleAddingCategory = () => {
        setAddingCategory(!addingCategory);
    };

    const cancelCategory = () => {
        setAddingCategory(false);
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
            <Header />
            <div className='flex flex-grow'>
                <aside className='flex flex-col w-1/5 bg-gray-800 bg-opacity-90 border-r-2 border-gray-700'>
                    <div className='flex justify-center border-gray-700 border-y-2'>
                        {addingCategory ? (
                            <form className='flex flex-col items-center space-y-2 p-2 m-auto' onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    type='text'
                                    {...register('categoryName', { required: true })}
                                    className='bg-gray-100 text-gray-800 p-2 rounded-md'
                                    placeholder='Category Name'
                                />
                                <div className='flex space-x-2'>
                                    <button type='submit' className='bg-gray-800 text-white hover:bg-gray-700 rounded-full p-2'>
                                        <FontAwesomeIcon icon={faSave} />
                                    </button>
                                    <button type='button' className='bg-gray-800 text-white hover:bg-gray-700 rounded-full p-2' onClick={cancelCategory}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
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
                                <Button icon={faTrash} />
                            </div>
                        ))}
                    </div>
                </aside>

                <main className='flex-grow container mx-auto flex justify-center p-4'>
                    {selectedCategory && <div>Content for {selectedCategory.name}</div>}
                </main>
            </div>
        </div>
    );
}

export default Project;
