import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
`;

const ButtonWrapper = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default ButtonWrapper;