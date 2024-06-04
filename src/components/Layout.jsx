import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const isLoggedIn = false; // 임시 변수

function Layout() {
  return (
    <Main>
      {location.pathname === '/' ? (
        <Header>
          <HomeButtons isLogIn={isLoggedIn} />
        </Header>
      ) : (
        <Header />
      )}
      <Outlet />
      <Footer />
    </Main>
  );
}
const Main = styled.main`
  background-color: white;
  /* min-width: 750px; */
  max-width: 1000px;
  margin: 0 auto;
`;

function HomeButtons({ isLogIn }) {
  if (isLogIn) {
    return (
      <Link to="/my_page" className="py-1 px-2 rounded text-sm font-bold">
        마이페이지
      </Link>
    );
  }

  return (
    <>
      <Link to="/sign_in" className="py-1 px-2 rounded text-sm font-bold">
        회원가입
      </Link>
      <Link to="/login" className="py-1 px-2 rounded text-sm font-bold">
        로그인
      </Link>
    </>
  );
}

export default Layout;
