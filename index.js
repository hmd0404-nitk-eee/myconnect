//Dependency Imports
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

//Local Imports
const { MONGODB } = require('./config');

//GraphQL Imports
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

//Global Variables
const PORT = process.env.PORT || 5000;

//Server Code
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, { useNewUrlParser: true})
    .then(() => {
        console.log("Database Connected Successfully!");
        return server.listen({port: PORT});
    })
    .then(res => {
        console.log(`Server Running at ${res.url}`);
    }).catch(err => {
        console.error(err);
    });