// const { query } = require("express");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const _ = require("lodash");

// dummy data

const books = [
  { id: "1", name: "To Kill a Mockingbird", genre: "Fiction", authorId: "1" },
  { id: "2", name: "1984", genre: "Dystopian", authorId: "2" },
  { id: "3", name: "The Great Gatsby", genre: "Classic", authorId: "3" },
  { id: "4", name: "The Catcher in the Rye", genre: "Fiction", authorId: "4" },
  { id: "5", name: "Moby Dick", genre: "Adventure", authorId: "2" },
  { id: "6", name: "Pride and Prejudice", genre: "Romance", authorId: "3" },
  { id: "7", name: "The Lord of the Rings", genre: "Fantasy", authorId: "3" },
  {
    id: "8",
    name: "Harry Potter and the Sorcerer's Stone",
    genre: "Fantasy",
    authorId: "8",
  },
  { id: "9", name: "The Alchemist", genre: "Philosophical", authorId: "9" },
  {
    id: "10",
    name: "Brave New World",
    genre: "Science Fiction",
    authorId: "10",
  },
];

const authors = [
  { id: "1", name: "Harper Lee", age: 89, bookId: "1" },
  { id: "2", name: "George Orwell", age: 46, bookId: "2" },
  { id: "3", name: "F. Scott Fitzgerald", age: 44, bookId: "3" },
  { id: "4", name: "J.D. Salinger", age: 91, bookId: "4" },
  { id: "5", name: "Herman Melville", age: 72, bookId: "5" },
  { id: "6", name: "Jane Austen", age: 41, bookId: "6" },
  { id: "7", name: "J.R.R. Tolkien", age: 81, bookId: "7" },
  { id: "8", name: "J.K. Rowling", age: 58, bookId: "8" },
  { id: "9", name: "Paulo Coelho", age: 76, bookId: "9" },
  { id: "10", name: "Aldous Huxley", age: 69, bookId: "10" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
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
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.bookId });
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
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
