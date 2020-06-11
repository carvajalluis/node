const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Post = require("../models/post");

module.exports = {
  createUser: async function ({ userInput }, req) {
    const { email, name, password } = userInput;

    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: "Email is invalid." });
    }
    if (
      !validator.isEmpty(password) ||
      !validator.isLength(password, { min: 5 })
    ) {
      errors.push({ message: "Password too short." });
    }
    if (!validator.isEmpty(name)) {
      errors.push({ message: "Name  is required." });
    }
    if (errors.length) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new Error("User exists already");
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      name: name,
      password: hashedPassword,
    });

    const storedUser = await user.save();
    return { ...storedUser._doc, _id: storedUser._id.toString() };
  },
  login: async function ({ userInput }, req) {
    const { email, password } = userInput;
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("Unable to login.");
      error.code = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      console.log(`pass not equal: ${user.email}`);
      const error = new Error("Unable to login.");
      error.code = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );

    return { token: token, userId: user._id.toString() };
  },

  createPost: async function ({ postInput }, req) {
    if (!req.isAuth) {
      const error = new Error("Not Authenticated");
      error.code = 401;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Not Authenticated");
      error.code = 401;
      throw error;
    }
    console.log(postInput);
    const { title, content, imageUrl } = postInput;

    const errors = [];
    if (validator.isEmpty(title) || !validator.isLength(title, { min: 10 })) {
      errors.push({ message: "title is invalid." });
    }
    if (
      validator.isEmpty(content) ||
      !validator.isLength(content, { min: 200 })
    ) {
      errors.push({ message: "content is invalid." });
    }
    if (!validator.isURL(imageUrl)) {
      errors.push({ message: "Image url is invalid." });
    }
    if (errors.length) {
      const error = new Error("Invalid input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,
      creator: user,
    });

    const storedPost = await post.save();

    user.posts.push(storedPost);
    user.save();
    
    return {
      ...storedPost._doc,
      _id: storedPost._id.toString(),
      createdAt: storedPost.createdAt.toISOString(),
      updatedAt: storedPost.updatedAt.toISOString(),
    };
  },
};
