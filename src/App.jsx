// src/App.jsx

import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './components/globalstyle/GlobalStyle';
import router from './shared/Router'; // router 임포트
import { useEffect } from 'react';
import supabase from './supabaseClient';



function App() {

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session)
        if (event === 'SIGNED_OUT') {
          // setSession(null)
        } else if (session) {
          // setSession(session)
        }
      })
  
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
