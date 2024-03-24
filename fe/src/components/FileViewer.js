// FileViewer.js
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import ChatBox from './ChatBox';

const FileViewer = ({ isOpen, closeModal, fileUrl, fileName }) => {
    const [showComments, setShowComments] = useState(false);
    const [isPDF, setIsPDF] = useState(false);
    const [isImage, setIsImage] = useState(false);

    useEffect(() => {
        const fetchFileDetails = async () => {
            try {
                const response = await fetch(fileUrl);
                const blob = await response.blob();
                const fileType = blob.type;
                setIsPDF(fileType === 'application/pdf');
                setIsImage(fileType.startsWith('image/'));
            } catch (error) {
                console.error('Error fetching file:', error);
            }
        };

        fetchFileDetails();
    }, [fileUrl]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}> {/* Set background color to dark */}
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="p-6">
                                <Dialog.Title className="text-lg font-medium text-gray-200"> {/* Set title color to light */}
                                    {fileName}
                                </Dialog.Title>

                                {/* PDF/Image Viewer */}
                                <div className="mt-2">
                                    {isPDF && (
                                        <iframe
                                            src={fileUrl}
                                            title="PDF Viewer"
                                            width="100%"
                                            height="500px"
                                            frameBorder="0"
                                        />
                                    )}
                                    {isImage && <img src={fileUrl} alt="" className="w-full" />}
                                    {!isPDF && !isImage && <p className="text-gray-200">This file type is not supported for preview.</p>} {/* Set text color to light */}
                                </div>

                                {/* Chat Box */}
                                <div className="mt-4">
                                    {showComments && <ChatBox />}
                                </div>

                                {/* Buttons */}
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        borderColor="border-transparent"
                                        icon={faThumbsUp}
                                        onClick={closeModal}
                                    />
                                    <Button
                                        borderColor="border-transparent"
                                        icon={faComments}
                                        onClick={toggleComments}
                                    />
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FileViewer;
