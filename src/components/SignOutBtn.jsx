import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function SignOutBtn() {
  const navigator = useNavigate();
  const signOut = async () => {
    await supabase.auth.signOut();
    navigator('/');
  };

  return (
    <button onClick={signOut} className="py-1 px-2 rounded text-sm font-bold">
      로그아웃
    </button>
  );
}

export default SignOutBtn;
