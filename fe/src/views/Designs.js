import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTrash, faTimes, faCheck, faUpload, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import FileViewer from '../components/FileViewer';

const Designs = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [addingCategory, setAddingCategory] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [files, setFiles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState({});

    const handleFileChange = (event) => {
        const fileList = event.target.files;
        const validFiles = [];
        const duplicateFiles = [];

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            // Check if the file is either a PDF or an image
            if (fileExtension === 'pdf' || file.type.startsWith('image/')) {
                const currentTime = new Date().toLocaleString();
                const fileId = Date.now() + file.name; // Generate unique ID using Date.now()

                const fileObject = {
                    id: fileId,
                    name: file.name,
                    type: fileExtension === 'pdf' ? 'pdf' : 'image',
                    fileData: URL.createObjectURL(file), // Store file data for preview
                    timestamp: currentTime // Add timestamp
                };

                // Check if the current file has the same name as any existing file
                const isDuplicate = files.some(categoryFiles => {
                    if (selectedCategory.name === categoryFiles.category) {
                        return categoryFiles.files.some(existingFile => existingFile.name === file.name);
                    }
                    return false;
                });

                if (isDuplicate) {
                    duplicateFiles.push(fileObject);
                } else {
                    validFiles.push(fileObject);
                }
            } else {
                // File type not supported
                const unsupportedFileTypeError = `File '${file.name}' has an unsupported file type.`;
                console.error(unsupportedFileTypeError);
                // You can handle this error as needed, e.g., display it to the user
            }
        }

        // Update state with valid files
        setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            let isCategoryMatched = false;

            // Check if the selectedCategory exists in prevFiles
            updatedFiles.forEach(categoryFiles => {
                if (categoryFiles.category === selectedCategory.name) {
                    isCategoryMatched = true;
                    categoryFiles.files.push(...validFiles);
                }
            });

            // If selectedCategory doesn't exist, add it with validFiles
            if (!isCategoryMatched) {
                updatedFiles.push({
                    category: selectedCategory.name,
                    files: [...validFiles]
                });
            }

            // Clear the file input after upload
            event.target.value = '';

            console.log('Uploaded Files:', validFiles);
            console.log('Duplicate Files:', duplicateFiles);

            return updatedFiles;
        });
    };


    const handleMouseEnter = (category) => {
        setHoveredCategory(category);
    };

    const handleMouseLeave = () => {
        setHoveredCategory(null);
    };

    const onSubmit = (data) => {
        const newCategory = { name: data.categoryName, id: Date.now() };
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setAddingCategory(false);
        reset();
    };

    const addCategory = () => {
        setAddingCategory(true);
        // setSelectedCategory(null);
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
        setSelectedCategory(category);
    };

    const confirmDeleteCategory = () => {
        // Handle category deletion here
        setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== selectedCategory.id));
        closeConfirmationDialog();
    };


    const openModal = () => {
        setIsOpen(true)
    };

    const closeModal = () => {
        setIsOpen(false)
    };

    const handleFileClick = (file) => {
        setSelectedFile(file)
        openModal()
    }



    return (
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
                                <Button type='submit' borderColor='green' icon={faSave} />
                                <Button borderColor='red' icon={faTimes} onClick={cancelCategory} />
                            </div>
                        </form>
                    ) : <Button borderColor='white' icon={faPlus} onClick={addCategory} />}
                </div>
                <div className='flex flex-col justify-center overflow-y-auto'>
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`flex items-center justify-evenly border-y-2 border-gray-700 cursor-pointer p-2 min-h-20 ${selectedCategory?.id === category.id ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
                                } text-center`}
                            onClick={() => selectCategory(category)}
                            onMouseEnter={() => handleMouseEnter(category)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="text-center overflow-hidden overflow-ellipsis whitespace-normal w-24">{category.name}</div>
                            {hoveredCategory?.id === category.id && (
                                <Button borderColor='red' icon={faTrash} onClick={() => deleteCategory(category)} />
                            )}
                        </div>
                    ))}
                </div>
                <div className={`${showConfirmationDialog ? '' : 'hidden'}`}>
                    {showConfirmationDialog && (
                        <Dialog buttonFunc1={confirmDeleteCategory} buttonFunc2={closeConfirmationDialog} buttonIcon1={faCheck} buttonIcon2={faTimes} dialogText={`Are you sure you want to delete the category "${selectedCategory?.name}"?`} buttonBorderColor1='red' buttonBorderColor2='green' />
                    )}
                </div>
            </aside>
            <main className="flex flex-col container p-4">
                {selectedCategory && !showConfirmationDialog && (
                    <div className="flex flex-col">
                        <div className="flex justify-center mb-4 text-xl">{selectedCategory.name} Designs</div>
                        <div className="flex justify-start">
                            <div className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg p-4 mx-4">
                                <label htmlFor="upload-input" className="cursor-pointer flex items-center justify-center">
                                    <FontAwesomeIcon className="mr-2" icon={faUpload} />
                                    Upload File
                                    <input id="upload-input" type="file" className='hidden' multiple onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-start flex-wrap">
                            {files.map(categoryFiles => {
                                if (categoryFiles.category === selectedCategory.name) {
                                    return categoryFiles.files.map(file => (
                                        <div key={file.id} className="cursor-pointer hover:bg-gray-700 mx-4 my-4 w-52 h-52 bg-gray-800 text-white rounded-lg shadow-md flex flex-col items-center justify-center" onClick={() => handleFileClick(file)}>
                                            <div className="h-full w-full relative rounded-t-lg overflow-hidden">
                                                {file.type === 'image' ? (
                                                    <img src={file.fileData} alt={file.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full w-full">
                                                        <FontAwesomeIcon icon={faFilePdf} className="text-5xl" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="h-10 w-full flex items-center justify-center">{file.name}</div>
                                        </div>
                                    ));
                                }
                                return null;
                            })}
                        </div>
                        <FileViewer isOpen={isOpen} closeModal={closeModal} fileUrl={selectedFile?.fileData} />

                    </div>
                )}
            </main>
        </div>
    );
}

export default Designs;
