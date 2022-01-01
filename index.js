//Dependency Imports
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

//Local Imports
const { MONGODB } = require('./config');

//GraphQL Imports
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

//Server Code
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, { useNewUrlParser: true})
    .then(() => {
        console.log("Database Connected Successfully!");
        return server.listen({port: 5000});
    })
    .then(res => {
        console.log(`Server Running at ${res.url}`);
    });