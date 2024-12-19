// const { query } = require("express");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;
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

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
