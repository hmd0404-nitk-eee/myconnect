const { AuthenticationError, UserInputError } = require('apollo-server');
 
const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');
const { validateComment } = require('../../util/input_valitdators');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);
            
            if(!validateComment(body)) {
                throw new UserInputError("Comment cannot be empty!", {
                    errors: "Comment can not be empty!"
                });
            }

            const post = await Post.findById(postId);

            if(post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                });
                await post.save();

                return post;
            } else {
                throw new UserInputError("Post Doesn't Exist!", {
                    errors: "Post DNE!"
                });
            }
        },

        deleteComment: async (_, { postId, commentId }, context) => {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);
            if(post) {
                const commentIdx = post.comments.findIndex((comment) => comment.id === commentId);

                if(post.comments[commentIdx].username === username) {
                    post.comments.splice(commentIdx, 1);

                    await post.save();
                    return post;
                } else throw new AuthenticationError("Action not allowed!");
            } else throw new UserInputError("Post Doesn't Exist!", { errors: "Post DNE!" });
        }
    }
}