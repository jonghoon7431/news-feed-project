import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function SignUp() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const { error } = await supabase.from('USERS').insert([{ user_id: userId, password }]);
    if (error) {
      console.error('Error signing up:', error);
    } else {
      alert('회원가입이 완료되었습니다.');
    }
  };

  return (
    <main>
      <form onSubmit={handleSignUp}>
        <label>
          아이디:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디를 입력하세요" />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요" />
        </label>
        <br />
        <label>
          비밀번호 재확인:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호를 다시 입력하세요" />
        </label>
        <br />
        <button type="submit">회원가입</button>
      </form>
      <p>
        이미 회원이라면? <Link to="/login">로그인하러 가기</Link>
      </p>
    </main>
  );
}

export default SignUp;
