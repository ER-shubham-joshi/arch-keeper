// FileViewer.js
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import ChatBox from './ChatBox';

const FileViewer = ({ isOpen, closeModal, fileUrl }) => {
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
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {isPDF ? 'PDF Preview' : (isImage ? 'Image Preview' : 'File Preview')}
                                </Dialog.Title>

                                {/* Mid Row - PDF/Image */}
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
                                    {isImage && <img src={fileUrl} alt="" style={{ width: '100%', height: '100%' }} />}
                                    {!isPDF && !isImage && <p>This file type is not supported for preview.</p>}
                                </div>

                                {/* Chat Box */}
                                <div className="mt-4">
                                    {showComments && <ChatBox />}
                                </div>

                                {/* Bottom Row - Buttons */}
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default FileViewer;
