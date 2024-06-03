import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LogIn />,  // 기본 경로에 LogIn 컴포넌트를 설정
      },
      {
        path: '/login',
        element: <LogIn />,
      },
      {
        path: '/sign_up',
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
