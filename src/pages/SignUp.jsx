// SignUp.jsx

import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    

    if (error) {
      if (error.message.includes('User already registered')) {
        setError('이미 등록된 이메일 주소입니다.');
      } else {
        setError('회원가입에 실패했습니다.');
      }
    } else {
      setError('');
      alert('회원가입이 완료되었습니다.');
    }
  };

  return (
    <main>
      <Header />
      <form onSubmit={handleSignUp}>
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
        <label>
          비밀번호 재확인:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            required
          />
        </label>
        <br />
        <button type="submit">회원가입</button>
      </form>
      <p>
        이미 회원이신가요? <Link to="/login">로그인하기</Link>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}

export default SignUp;
