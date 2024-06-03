//src>components>SignInBtn.jsx

import { supabase } from '../supabaseClient';

function SignInBtn() {
  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  return <button onClick={signInWithGithub}>로그인</button>;
}

export default SignInBtn;

