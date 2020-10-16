import { combineReducers } from 'redux';
import base from './base';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import kakao, { kakaoSaga } from './kakao';
import book, { bookSaga } from './book';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([authSaga(), userSaga(), kakaoSaga(), bookSaga()]);
  // yield all([fork(authSaga), fork(userSaga)]);
}

export default combineReducers({
  base,
  auth,
  user,
  kakao,
  book
});