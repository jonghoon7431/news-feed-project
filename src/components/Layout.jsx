import React from 'react';
import styled from 'styled-components';

function Layout({ children }) {
  return <Main>{children}</Main>;
}

const Main = styled.main`
  background-color: #ccc;
  min-width: 750px;
  max-width: 1000px;
  margin: 0 auto;
`;

export default Layout;
