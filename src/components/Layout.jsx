import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
function Layout() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}
const Main = styled.main`
  background-color: #ccc;
  min-width: 750px;
  max-width: 1000px;
  margin: 0 auto;
`;
export default Layout;
