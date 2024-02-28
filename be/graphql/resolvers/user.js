const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');
const { UserModel } = require('../../models/index');
const { createDocument, getAllDocuments, getDocumentById, updateDocumentById, deleteDocumentById } = require('../../utils/crudUtils');

const handleGenericError = (error, defaultMessage = 'An unexpected error occurred', defaultCode = 'INTERNAL_SERVER_ERROR') => {
    if (error instanceof ApolloError) {
        // If it's already an ApolloError, rethrow as is
        throw error;
    } else {
        // If it's a non-specific error, create an ApolloError instance
        console.error(error); // Log the error for debugging
        throw new ApolloError(defaultMessage, defaultCode);
    }
};

const userResolver = {
    Query: {
        getUser: async (_, { id }, { req }) => {
            try {
                if (req.user.scope === 'admin') {
                    return await getDocumentById(UserModel, id);
                } else {
                    handleGenericError(null, 'Insufficient permissions', 'INSUFFICIENT_PERMISSIONS');
                }
            } catch (error) {
                handleGenericError(error, 'Failed to fetch user', 'FETCH_USER_ERROR');
            }
        },
        getAllUsers: async (_, __, { req }) => {
            try {
                if (req.user.scope === 'admin') {
                    return await getAllDocuments(UserModel);
                } else {
                    handleGenericError(null, 'Insufficient permissions', 'INSUFFICIENT_PERMISSIONS');
                }
            } catch (error) {
                handleGenericError(error, 'Failed to fetch users', 'FETCH_USERS_ERROR');
            }
        },
    },
    Mutation: {
        createUser: async (_, { name, email, password, scope, avatar, theme }, { req, res }) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = { name, email, password: hashedPassword, scope, avatar, theme };
                const { id } = await createDocument(UserModel, newUser);
                newUser.id = id;
                return newUser;
            } catch (error) {
                handleGenericError(error, 'Failed to create user', 'CREATE_USER_ERROR');
            }
        },
        login: async (_, { email, password }, { req, res }) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    handleGenericError(null, 'Invalid credentials', 'INVALID_CREDENTIALS');
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    handleGenericError(null, 'Invalid credentials', 'INVALID_CREDENTIALS');
                }

                const token = jwt.sign({ name: user.name, email: user.email, scope: user.scope, theme: user.theme }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'Lax' });
                return { token };
            } catch (error) {
                handleGenericError(error, 'Failed to authenticate', 'AUTHENTICATION_ERROR');
            }
        },
    },
};

module.exports = userResolver;
