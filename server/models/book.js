const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: Schema.Types.ObjectId,
});

module.exports = mongoose.model("Book", bookSchema);
