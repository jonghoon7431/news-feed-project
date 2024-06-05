import { Link } from 'react-router-dom';
import mvLogo from '../assets/logoMV.svg';

function Header({ showAuthLinks = true }) {
  return (
    <header className="flex justify-between h-16 px-3 py-5 items-center">
      <span className="h-full ml-2">
        <Link to="/">
          <img src={mvLogo} alt="MV logo" className="h-full" />
        </Link>
      </span>
      {showAuthLinks && (
        <span>
          <Link to="/sign_up" className="mr-4 text-lg  hover:underline">
            회원가입
          </Link>
          <Link to="/login" className="text-lg  hover:underline">
            로그인
          </Link>
        </span>
      )}
    </header>
  );
}

export default Header;
