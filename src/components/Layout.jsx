<<<<<<< HEAD
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
=======
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

>>>>>>> 4297d891e990f8f41ee620d328cca9f66be1934f
function Layout() {
  const user = useSelector((state) => state.auth.signedInUser);
  const isLoggedIn = user ? true : false;

  const location = useLocation();
  return (
    <main className="bg-white max-w-[1000px] min-x-[750px] mx-auto my-0">
      {location.pathname === '/' ? (
        <Header>
          <HomeButtons isLogIn={isLoggedIn} />
        </Header>
      ) : location.pathname === '/create_post' ? (
        ''
      ) : (
        <Header />
      )}
      <Outlet />
      <Footer />
    </main>
  );
}

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
      <Link to="/sign_up" className="py-1 px-2 rounded text-sm font-bold">
        회원가입
      </Link>
      <Link to="/login" className="py-1 px-2 rounded text-sm font-bold">
        로그인
      </Link>
    </>
  );
}
<<<<<<< HEAD
const Main = styled.main`
  background-color: white;
  /* min-width: 750px; */
  max-width: 1000px;
  margin: 0 auto;
`;
=======

>>>>>>> 4297d891e990f8f41ee620d328cca9f66be1934f
export default Layout;
