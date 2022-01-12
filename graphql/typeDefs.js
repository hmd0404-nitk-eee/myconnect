const { gql } = require('graphql-tag');

module.exports = gql`
    input RegisterCredentials {
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }

    type Comment {
        id: ID!,
        createdAt: String!,
        username: String!,
        body: String!
    }

    type Like {
        id: ID!,
        createdAt: String!,
        username: String!
    }

    type User {
        id: ID!,
        username: String!,
        email: String!,
        createdAt: String!,
        token: String!
    }

    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
        likesCount: Int!
        commentsCount: Int!
    }

    type Query {
        getPosts: [Post],
        getSinglePost(postId: ID!): Post!
    }

    type Mutation {
        registerUser(registerCredentials: RegisterCredentials!): User!,
        loginUser(username: String!, password: String!): User!,
        createPost(body: String!): Post!,
        deletePost(postId: ID!): String!,
        createComment(postId: ID!, body: String!): Post!,
        deleteComment(postId: ID!, commentId: ID!): Post!,
        likePost(postId: ID!): Post!
    }
`;