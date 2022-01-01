const PostResolvers = require('./posts');
const UserResolvers = require('./users');
const CommentResolvers = require('./comments');

module.exports = {
    Post: {
        likesCount: (parent) => parent.likes.length,
        commentsCount: (parent) => parent.comments.length
    },

    Query: {
        ...PostResolvers.Query
    },
    Mutation: {
        ...UserResolvers.Mutation,
        ...PostResolvers.Mutation,
        ...CommentResolvers.Mutation
    }
}