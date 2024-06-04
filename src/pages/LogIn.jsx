// LogIn.jsx

import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import SignInBtn from '../components/SignInBtn';


function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } else {
      setError('');
      alert('로그인되었습니다.');
    }
  };

  return (
    <main>
      <form onSubmit={handleSignIn}>
        <label>
          이메일:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
        </label>
        <br />
        <label>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </label>
        <br />
        <button type="submit">로그인</button>
      </form>
      <p>
        아직 회원이 아니라면? <Link to="/sign_up">가입하러 가기</Link>
      </p>
      <SignInBtn />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}

export default LogIn;
