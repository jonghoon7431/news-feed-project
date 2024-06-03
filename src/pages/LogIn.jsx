import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../supabaseClient';
import SignInBtn from '../components/SignInBtn';
import SignOutBtn from '../components/SignOutBtn';
import { setSignIn } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';

function LogIn() {
  const dispatch = useDispatch();
  const signIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    const checkSignIn = async () => {
      const session = await supabase.auth.getSession();
      dispatch(setSignIn(!!session.data.session));
    };

    checkSignIn();
  }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('USERS').select();
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        console.log('Users:', data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main>
      <label>
        아이디:
        <input type="text" placeholder="아이디를 입력하세요" />
      </label>
      <br />
      <label>
        비밀번호:
        <input type="password" placeholder="비밀번호를 입력하세요" />
      </label>
      <br />
      <p>
        아직 회원이 아니라면? <Link to="/sign_up">가입하러가기</Link>
      </p>
      {signIn ? <SignOutBtn /> : <SignInBtn />}
    </main>
  );
}

export default LogIn;
