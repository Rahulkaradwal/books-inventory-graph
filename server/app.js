const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
require("dotenv").config(); // Load environment variables

const app = express();

// MongoDB Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connect();

// GraphQL Middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema,

    graphiql: true, // Enable GraphiQL for query testing
  })
);

// Start Server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
