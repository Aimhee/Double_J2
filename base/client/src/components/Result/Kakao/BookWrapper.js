import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from 'lib/styleUtils';

const Positioner = styled.div`
  // display: flex;
  position: relative;
  margin: 10px;
  padding: 10px;
  width: 200px;
  height: 500px;
  border: 1px solid ${oc.gray[4]};
`;

const Thumbnail = styled.img`
  // margin: 15px;
  // border: 1px solid ${oc.gray[4]};
  width: 178px;
  height: 258.1px;
  // width: 100%;
`;

const InfoContainer = styled.div`
  margin: 10px;
`;

const TitleLink = styled.a`
  color: ${oc.blue[6]};
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    color: ${oc.red[6]};
    text-decoration: underline;
  }
`

const DetailButton = styled(Link)`
  position: absolute;
  width: 178px;
  bottom: 10px;
  left: 50%;
  margin-left: -89px;
  font-weight: 600;
  color: ${oc.pink[4]};
  border: 1px solid ${oc.pink[4]};
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
  text-align: center;
  transition: .2s all;

  &:hover {
    background: ${oc.pink[4]};
    color: white;
    ${shadow(1)}
  }

  &:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
  }
`;

function BookWrapper({ book }) {
  const { thumbnail, title, authors, url, isbn, publisher, datetime, sale_price } = book;
  const isbnthirteen = isbn.split(' ')[1]
  return (
    <Positioner>
      <Thumbnail src={thumbnail}/>
      <InfoContainer>
        <TitleLink href={url} target="_blank">{title}</TitleLink>
        <p>{authors.join(" ")} 지음</p>
        {/* <p>출판사: {publisher}</p>
        <p>{datetime.substr(0, 4)}년 {datetime.substr(5, 2)}월</p>
        <p>판매가: {sale_price.toLocaleString()}</p> */}
      </InfoContainer>
      <DetailButton to={"/search/kakao/detail?isbn=" + isbnthirteen}>
        상세정보 / 서재담기
      </DetailButton>
    </Positioner>
  )
};

export default BookWrapper;