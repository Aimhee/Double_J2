import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as BookAPI from 'lib/api/book';
import * as KakaoAPI from 'lib/api/kakao';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';

const [
  GET_BOOKCASE,
  GET_BOOKCASE_SUCCESS,
  GET_BOOKCASE_FAILURE
] = createRequestActionTypes('book/GET_BOOKCASE')
const [
  BOOKCASE_REGISTER, 
  BOOKCASE_REGISTER_SUCCESS, 
  BOOKCASE_REGISTER_FAILURE
] = createRequestActionTypes('book/BOOKCASE_REGISTER')
const [
  SEARCH_BOOKCASE_BOOK,
  SEARCH_BOOKCASE_BOOK_SUCCESS,
  SEARCH_BOOKCASE_BOOK_FAILURE
] = createRequestActionTypes('book/SEARCH_BOOKCASE_BOOK')
const [
  SEARCH_KAKAO_BOOK,
  SEARCH_KAKAO_BOOK_SUCCESS,
  SEARCH_KAKAO_BOOK_FAILURE
] = createRequestActionTypes('book/SEARCH_KAKAO_BOOK')

export const getBookcase = createAction(GET_BOOKCASE, email => email);
export const bookcaseRegister = createAction(BOOKCASE_REGISTER, obj => obj);
export const searchBookcaseBook = createAction(SEARCH_BOOKCASE_BOOK, isbn => isbn);
export const searchKakaoBook = createAction(SEARCH_KAKAO_BOOK, isbn => isbn);

const getBookcaseSaga = createRequestSaga(GET_BOOKCASE, BookAPI.getBookcase);
const bookcaseRegisterSaga = createRequestSaga(BOOKCASE_REGISTER, BookAPI.bookcaseRegister);
const searchBookcaseBookSaga = createRequestSaga(SEARCH_BOOKCASE_BOOK, BookAPI.searchBookcaseBook)
const searchKakaoBookSaga = createRequestSaga(SEARCH_KAKAO_BOOK, KakaoAPI.searchKakaoBooks);

const initialState = {
  email: "",
  selectedBook: {
    title: "",
    thumbnail: "",
    isbn: "",
    type: []
  },
  data: []
};

export function* bookSaga() {
  yield takeEvery(GET_BOOKCASE, getBookcaseSaga);
  yield takeEvery(BOOKCASE_REGISTER, bookcaseRegisterSaga);
  yield takeEvery(SEARCH_KAKAO_BOOK, searchKakaoBookSaga);
}

export default handleActions({
  [GET_BOOKCASE]: (state, action) => {
    return produce(state, draft => {
      draft.data = action.payload.data
    })
  },
  [BOOKCASE_REGISTER_SUCCESS]: (state, action) => {
    const { email, bookcase } = action.payload;
    return produce(state, draft => {
      draft.email = email;
      draft.data = bookcase;
    })
  },
  [SEARCH_KAKAO_BOOK_SUCCESS]: (state, action) => {
    const { documents } = action.payload.data;
    const book = documents[0];
    console.log('book', book)
    return produce(state, draft => {
      draft.selectedBook = book;
      draft.selectedBook.type = [];
    })
  }
}, initialState)