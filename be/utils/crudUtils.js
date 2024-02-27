const { ApolloError } = require('apollo-server-express');

const createDocument = async (Model, data) => {
    try {
        const newDocument = new Model(data);
        const docCreated = await newDocument.save();
        console.log('Document created successfully');
        return docCreated;
    } catch (error) {
        console.error('Error creating document:', error);
        throw new ApolloError('Error creating document', 'CREATE_DOCUMENT_ERROR');
    }
};

const getAllDocuments = async (Model) => {
    try {
        const documents = await Model.find();
        console.log('All Documents:', documents);
        return documents; // Return the documents
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw new ApolloError('Failed to fetch documents', 'FETCH_DOCUMENTS_ERROR');
    }
};

const getDocumentById = async (Model, documentId) => {
    try {
        const document = await Model.findById(documentId);
        console.log('Document by ID:', document);
        return document; // Return the document
    } catch (error) {
        console.error('Error fetching document by ID:', error);
        throw new ApolloError('Failed to fetch document by ID', 'FETCH_DOCUMENT_BY_ID_ERROR');
    }
};

const updateDocumentById = async (Model, documentId, newData) => {
    try {
        await Model.findByIdAndUpdate(documentId, newData);
        console.log('Document updated successfully');
    } catch (error) {
        console.error('Error updating document:', error);
        throw new ApolloError('Failed to update document', 'UPDATE_DOCUMENT_ERROR');
    }
};

const deleteDocumentById = async (Model, documentId) => {
    try {
        await Model.findByIdAndDelete(documentId);
        console.log('Document deleted successfully');
    } catch (error) {
        console.error('Error deleting document:', error);
        throw new ApolloError('Failed to delete document', 'DELETE_DOCUMENT_ERROR');
    }
};

module.exports = {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocumentById,
    deleteDocumentById
};
