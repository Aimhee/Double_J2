import axios from 'axios';

export const getBooksList = () => axios.get('/api/books');
export const addBook = (book) => axios.post('/api/books', book);
export const updateStock = ({ id, stock }) => axios.patch('/api/books', { id, stock })