import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtils';

const BorderedButton = styled.button`
  font-weight: 600;
  color: ${oc.pink[4]};
  border: 1px solid ${oc.pink[4]};
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
  transition: .2s all;

  width: 50px;
  text-align: center;
  background: white;

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

const PageButton = ({ value, name, onClick, children }) => (
  <BorderedButton onClick={onClick} value={value} name={name}>
    {children}
  </BorderedButton>
);

export default PageButton;