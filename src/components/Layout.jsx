import { Link, Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const isLoggedIn = false; // 임시 변수

function Layout() {
  const location = useLocation();
  return (
    <main className="bg-white max-w-[1000px] mx-auto my-0">
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
