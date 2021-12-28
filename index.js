//Dependency Imports
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

//Local Imports
const { MONGODB } = require('./config');

//GraphQL Code
const typeDefs = gql`
    type Query {
        helloWorld: String
    }
`;

const resolvers = {
    Query: {
        helloWorld: () => 'Hello World!'
    }
};

//Server Code
const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({port: 5000})
    .then(res => {
        console.log(`Server Running at ${res.url}`);
    })