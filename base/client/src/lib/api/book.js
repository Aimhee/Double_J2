import axios from 'axios';

export const getBookcase = (email) => axios.get('/api/books/' + email)
export const bookcaseRegister = ({ id }) => axios.post('/api/books', { id });
export const searchBookcaseBook = ({ isbn }) => axios.get('api/books', { isbn })
