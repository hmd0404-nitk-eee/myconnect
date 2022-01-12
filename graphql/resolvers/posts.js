const { UserInputError, AuthenticationError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/checkAuth");
const { validatePost } = require("../../util/input_valitdators");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getSinglePost(_, { postId }) {
      try{
        const post = await Post.findById(postId);
        if(post) {
          return post;
        } else {
          throw new Error('Post not Found!');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(parent, { body }, context) {
      const { errors, valid } = validatePost(body);

      if (!valid) {
        throw new UserInputError("Post cannot be empty", { errors });
      }

      const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = newPost.save();

      return post;
    },

    async deletePost(parent, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username !== post.username) {
          throw new AuthenticationError("Action not permissible!");
        } else {
          await post.delete();
          return "Post deleted successfully.";
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async likePost(parent, { postId }, context) {
        const { username } = checkAuth(context);

        const post = await Post.findById(postId);
        if(post) {
            if(post.likes.find((like) => like.username === username)) {
                //Unlike the Comment
                post.likes = post.likes.filter((like) => like.username !== username);
            } else {
                //Like the Comment
                post.likes.push({
                    username,
                    createdAt: new Date().toISOString()
                });
            }

            await post.save();

            return post;
        } else throw new UserInputError("Post not Found!", { errors: "Post DNE!" });
    }
  },
};
