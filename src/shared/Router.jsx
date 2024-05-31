import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import CreatePost from '../pages/CreatePost';
import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import MyPage from '../pages/MyPage';
import Post from '../pages/Post';
import SignIn from '../pages/SignIn';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/create_post" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/my_page" element={<MyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
