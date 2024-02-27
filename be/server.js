const express = require('express');
const http = require('http');
const { ApolloServer, ApolloError } = require('apollo-server-express');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { Server } = require('socket.io');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectToDb } = require('./models/index');
const path = require('path');
const { authenticateUser } = require('./middlewares/auth');
const cors = require('cors'); // Import the cors middleware
const dotenv = require('dotenv');

//Apply env
dotenv.config();

// Set up Express app and create HTTP server
const app = express();
// Allow requests from Postman's origin (adjust as needed)
// const corsOptions = {
//   origin: 'https://www.postman.com',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// };

app.use(cors());
app.use(helmet());
// Set up rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(express.json({ limit: '10kb' })); // Use cors middleware

app.use(authenticateUser);

const serverHttp = http.createServer(app);

// Dynamically load schemas
const schemaFiles = loadFilesSync(path.join(__dirname, './graphql/schemas/*.js'));
const typeDefs = mergeTypeDefs(schemaFiles);

// Dynamically load resolvers
const resolverFiles = loadFilesSync(path.join(__dirname, './graphql/resolvers/*.js'));
const resolvers = mergeResolvers(resolverFiles);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }), // Pass request and response objects to context
  formatError: (error) => {
    // Log the error for debugging purposes
    console.error(error);

    // Return the original error if it's an ApolloError
    if (error.originalError instanceof ApolloError) {
      return error;
    }

    // If it's not an ApolloError, return a generic internal server error
    return new ApolloError('Internal Server Error', 'INTERNAL_SERVER_ERROR');
  },
});

// Start the Apollo Server first
async function startApolloServer() {
  await server.start();
  await connectToDb();

  // Apply Apollo Server middleware to Express app
  server.applyMiddleware({ app });

  // Set up Socket.IO
  const io = new Server(serverHttp, {
    cors: {
      origin: "http://localhost:3000", // Adjust this based on your React app's URL
      methods: ["GET", "POST"]
    }
  });

  // Listen to connections
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Example: Broadcasting a message to all connected clients
    socket.on('message', (message) => {
      io.emit('message', message);
    });

    // Example: Handling disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  // Start the combined server
  const PORT = 3001;
  serverHttp.listen(PORT, () => {
    console.log(`Server and Socket.IO running at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
