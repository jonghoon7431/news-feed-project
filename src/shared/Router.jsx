import { createBrowserRouter } from 'react-router-dom';
import CreatePost from '../pages/CreatePost';
import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import MyPage from '../pages/MyPage';
import Post from '../pages/Post';
import SignIn from '../pages/SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/sign_in',
    element: <SignIn />,
  },
  {
    path: '/create_post',
    element: <CreatePost />,
  },
  {
    path: '/post/:id',
    element: <Post />,
  },
  {
    path: '/my_page',
    element: <MyPage />,
  },
]);

export default router;
