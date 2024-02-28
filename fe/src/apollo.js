import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql', // Proxy endpoint
    cache: new InMemoryCache(),
    fetchOptions: {
        credentials: 'include'
    },
});

export default client;