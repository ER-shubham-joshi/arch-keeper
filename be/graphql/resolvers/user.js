const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { UserModel } = require('../../models/index');
const { createDocument, getAllDocuments, getDocumentById, updateDocumentById, deleteDocumentById } = require('../../utils/crudUtils');

const userResolver = {
    Query: {
        getUser: async (_, { id }, { req }) => {
            try {
                if (req.user.scope === 'admin') {
                    return await getDocumentById(UserModel, id);
                } else {
                    throw new AuthenticationError('Insufficient permissions');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                throw new ApolloError('Failed to fetch user', 'FETCH_USER_ERROR');
            }
        },
        getAllUsers: async (_, __, { req }) => {
            try {
                if (req.user.scope === 'admin') {
                    return await getAllDocuments(UserModel);
                } else {
                    throw new AuthenticationError('Insufficient permissions');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                throw new ApolloError('Failed to fetch users', 'FETCH_USERS_ERROR');
            }
        },
    },
    Mutation: {
        createUser: async (_, { name, email, password, scope, avatar, theme }, { req, res }) => {
            try {
                // Generate a salt
                const salt = await bcrypt.genSalt(10);

                // Combine password and salt, then hash using bcrypt
                const hashedPassword = await bcrypt.hash(password, salt);
                const newUser = { name, email, password: hashedPassword, scope, avatar, theme };
                const { id } = await createDocument(UserModel, newUser);
                newUser.id = id;
                return newUser;
            } catch (error) {
                console.error('Error creating user:', error);
                throw new ApolloError('Failed to create user', 'CREATE_USER_ERROR');
            }
        },
        login: async (_, { email, password }, { req, res }) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    throw new AuthenticationError('Invalid credentials');
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new AuthenticationError('Invalid credentials');
                }

                const token = jwt.sign({ name: user.name, email: user.email, scope: user.scope, theme: user.theme }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie('authToken', token, { httpOnly: true, secure: true, sameSite: 'Lax' });
                return { token };
            } catch (error) {
                console.error('Error during login:', error);
                throw new AuthenticationError('Failed to authenticate');
            }
        },
    },
};

module.exports = userResolver;
