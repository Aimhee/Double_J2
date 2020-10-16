import React from 'react';
import { Route } from 'react-router-dom';
import { KakaoResult, BookDetail } from 'containers/Result';
import { BaseWrapper } from 'components/Base';

function Searched() {
  return (
    <BaseWrapper>
      <Route exact path="/search/kakao" component={KakaoResult} />
      <Route path="/search/kakao/detail" component={BookDetail} />
    </BaseWrapper>
  );
}

export default Searched;