import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InfoWrapper, KakaoContents, BookWrapper, PageButton, ButtonWrapper } from 'components/Result/Kakao';
import { bindActionCreators } from 'redux';
import * as kakaoActions from 'redux/modules/kakao';

function KakaoResult() {
  const { text, endPage, pageableCount, page, data } = useSelector(state => ({
    text: state.kakao.text,
    endPage: state.kakao.endPage,
    pageableCount: state.kakao.pageableCount,
    page: state.kakao.page,
    data: state.kakao.data
  }));
  const sizes = [10, 20, 40];
  const dispatch = useDispatch();
  const KakaoActions = bindActionCreators(kakaoActions, dispatch);

  const movePages = async (e) => {
    const { name } = e.target;
    var value = Number(page);
    name === 'next' ? value += 5 : value -= 5
    try {
      if(name === 'next'){
        await KakaoActions.changeSize({ form: 'page', value })
        await KakaoActions.searchKakaoBooks({text, page: value, size: 10});
      } else {
        await KakaoActions.changeSize({ form: 'page', value })
        await KakaoActions.searchKakaoBooks({text, page: value, size: 10});
      }
    } catch (e) {
      console.log(e)
    }
  }
  const pageNumber = [...Array(5)].map((a, b) => b + 1 + parseInt((page - 1)/5)*5).filter(c => endPage >= c)

  const onChangeSize = async (e) => {
    const value = e.target.value;
    if(text){
      try {
        await KakaoActions.changeSize({ form: 'size', value })
        await KakaoActions.searchKakaoBooks({text, page: 1, size: value});
      } catch (e) {
        console.log(e)
      }
    }
  }

  const onChangePage = async (e) => {
    const {value} = e.target
    try {
      await KakaoActions.changeSize({ form: 'page', value })
      await KakaoActions.searchKakaoBooks({text, page: value, size: 10});
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <InfoWrapper text={text} pageableCount={pageableCount} onChange={onChangeSize}>
        {
          sizes.map((size, idx) => (
            <option key={idx} value={size}>{size}개</option>
          ))
        }
      </InfoWrapper>
      <KakaoContents >
        {
          data && data.map((book, idx) => (
            <BookWrapper key={idx} book={book} />
          ))
        }
      </KakaoContents>
      <ButtonWrapper>
        {
          parseInt((page - 1)/5) !== 0 
          && <PageButton name="prev" onClick={movePages} >이전</PageButton>
        }
        {
          pageNumber && pageNumber.map((num, idx) => (
        <PageButton key={idx} value={num} onClick={onChangePage} >
          {num}
        </PageButton>
          ))
        }
        {
          parseInt((page-1)/5) !== parseInt((endPage-1)/5)
          && <PageButton name="next" onClick={movePages} >다음</PageButton>
        }
      </ButtonWrapper>
    </>
  )
}

export default KakaoResult;