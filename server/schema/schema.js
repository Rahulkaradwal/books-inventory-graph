// const { query } = require("express");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;
const _ = require("lodash");

// dummy data

const books = [
  { id: "1", name: "To Kill a Mockingbird", genre: "Fiction" },
  { id: "2", name: "1984", genre: "Dystopian" },
  { id: "3", name: "The Great Gatsby", genre: "Classic" },
  { id: "4", name: "The Catcher in the Rye", genre: "Fiction" },
  { id: "5", name: "Moby Dick", genre: "Adventure" },
  { id: "6", name: "Pride and Prejudice", genre: "Romance" },
  { id: "7", name: "The Lord of the Rings", genre: "Fantasy" },
  { id: "8", name: "Harry Potter and the Sorcerer's Stone", genre: "Fantasy" },
  { id: "9", name: "The Alchemist", genre: "Philosophical" },
  { id: "10", name: "Brave New World", genre: "Science Fiction" },
];

const authors = [
  { id: "1", name: "Harper Lee", age: 89 },
  { id: "2", name: "George Orwell", age: 46 },
  { id: "3", name: "F. Scott Fitzgerald", age: 44 },
  { id: "4", name: "J.D. Salinger", age: 91 },
  { id: "5", name: "Herman Melville", age: 72 },
  { id: "6", name: "Jane Austen", age: 41 },
  { id: "7", name: "J.R.R. Tolkien", age: 81 },
  { id: "8", name: "J.K. Rowling", age: 58 },
  { id: "9", name: "Paulo Coelho", age: 76 },
  { id: "10", name: "Aldous Huxley", age: 69 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get the data from db or other sources
        // with lodash library
        return _.find(books, { id: args.id });
        // vanilla js approach
        // return books.find((book) => book.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
