const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Post!]!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    input UserSignUpInput {
        email: String!
        name: String!
        password: String!
    }

    input UserLoginInput {
        email: String!
        password: String!
    }

    input PostInput {
        title: String!
        content: String!
        imageUrl: String!
    }

    type RootQuery {
        login(userInput:UserLoginInput): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserSignUpInput): User!
        createPost(postInput: PostInput): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
