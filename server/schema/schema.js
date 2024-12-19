const Author = require("../models/author");
const Book = require("../models/book");

const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        try {
          return await Author.findById(parent.authorId);
        } catch (error) {
          throw new Error("Failed to fetch author: " + error.message);
        }
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        try {
          return await Book.find({ authorId: parent.id });
        } catch (error) {
          throw new Error("Failed to fetch books: " + error.message);
        }
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          return await Book.findById(args.id);
        } catch (err) {
          throw new Error("Failed to fetch book: " + err.message);
        }
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        try {
          return await Author.findById(args.id);
        } catch (err) {
          throw new Error("Failed to fetch author: " + err.message);
        }
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve() {
        try {
          return await Book.find();
        } catch (err) {
          throw new Error("Failed to fetch books: " + err.message);
        }
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve() {
        try {
          return await Author.find();
        } catch (err) {
          throw new Error("Failed to fetch authors: " + err.message);
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        try {
          const author = new Author({ name: args.name, age: args.age });
          return await author.save();
        } catch (error) {
          throw new Error("Failed to add author: " + error.message);
        }
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        try {
          const book = new Book({
            name: args.name,
            genre: args.genre,
            authorId: args.authorId,
          });
          return await book.save();
        } catch (err) {
          throw new Error("Failed to add book: " + err.message);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
