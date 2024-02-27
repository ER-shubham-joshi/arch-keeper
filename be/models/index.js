const mongoose = require('mongoose');

const connectToDb = async () => {
    // MongoDB Atlas connection string
    const mongoURI = process.env.DB_CONNECTION_STRING;

    mongoose.connect(mongoURI);
    const connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'DB Connection error:'));

    connection.once('open', () => {
        console.log('MongoDB Atlas connection established successfully');
    });
}

const UserModel = require('./user');

module.exports = {
    UserModel,
    connectToDb
}