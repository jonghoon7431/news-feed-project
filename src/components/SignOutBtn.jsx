//src>components>SignOutBtn.jsx

import { supabase } from '../supabaseClient';

function SignOutBtn() {
  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return <button onClick={signOut}>로그아웃</button>;
}

export default SignOutBtn;
