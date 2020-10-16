const mongoose = require('mongoose');
const { Schema } = mongoose;

// const Book = new Schema({
//   authors: [String],
//   contents: String,
//   datetime: Date,
//   isbn: String,
//   price: Number,
//   publisher: String,
//   sale_price: Number,
//   status: String,
//   thumbnail: String,
//   title: String,
//   translators: [String],
//   url: String,
//   type: [String],
//   grade: Number
// });

const BookInfo = new Schema({
  id: String,
  title: String,
  thumbnail: String,
  isbn: String,
  type: [String]
})

const Book = new Schema({
  email: String,
  bookcase: [BookInfo]
})

Book.statics.findByEmail = function(email) {
  console.log(email)
  return this.findOne({ email }).exec();
};

Book.statics.findByEmailAndBook = function ({email, isbn}) {
  return this.find({ email, bookcase: {isbn} }).exec();
}

Book.methods.findBook = function (isbn) {
  console.log(this.bookcase, isbn)
  return this.bookcase.find(isbn);
}

Book.methods.addBook = function (bookInfo) {
  this.bookcase.push(bookInfo);
  return this.save();
};

module.exports = mongoose.model('Book', Book);