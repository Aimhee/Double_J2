const Router = require('koa-router');

const books = new Router();
const booksCtrl = require('./books.controller');

books.get('/', booksCtrl.list);
books.get('/:email', booksCtrl.get);
books.get('/search/:email', booksCtrl.getBook);
books.post('/', booksCtrl.create);
books.delete('/', booksCtrl.delete);
// books.put('/:id', booksCtrl.replace);
books.put('/:email', booksCtrl.replace);
books.patch('/:email', booksCtrl.bookUpdate);
books.patch('/add/:email', booksCtrl.addBook);
books.patch('/remove/:email', booksCtrl.removeBook);

module.exports = books;