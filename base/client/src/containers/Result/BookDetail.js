import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bookActions from 'redux/modules/book';
import queryString from 'query-string';

function BookDetail({ location }) {
  const { selectedBook } = useSelector(state => ({
    selectedBook: state.book.selectedBook
  }));
  const { title, isbn, thumbnail, authors, publisher, type } = selectedBook;
  console.log('authors: ', authors)
  const dispatch = useDispatch();
  const BookActions = bindActionCreators(bookActions, dispatch);

  const getBookDetail = async (isbn) => {
    console.log('isbn:', isbn)
    try {
      const book = await BookActions.searchKakaoBook({text: isbn});
      console.log(book)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const query = queryString.parse(location.search)
    console.log(query.isbn)
    if(query){
      getBookDetail(query.isbn)
    }
  }, [])

  return (
    <div>
      <img src={thumbnail} width="200"/>
      <p>제목: {title}</p>
      <p>저자: {authors}</p>
      <p>출판사: {publisher}</p>
    </div>
  )
};

export default BookDetail;