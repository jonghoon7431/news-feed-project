import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import pencil from '../assets/pencil.png';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PostList from '../components/PostList';
import { SearchSection } from '../components/Search';
import supabase from '../supabaseClient';
import { useSelector } from 'react-redux';

function Home() {
  const [searchedPosts, setSearchedPosts] = useState([]); // 검색 결과
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const user = useSelector((state) => state.auth.signedInUser);
  const isLoggedIn = user ? true : false;

  useEffect(() => {
    (async () => {
      const list = await api.posts.getPopularPosts();
      setPopularPosts(list);
    })();

    (async () => {
      const list = await api.posts.getRecentPosts();
      setRecentPosts(list);
    })();
  }, []);

  const handleSearch = async (keyword) => {
    const posts = await api.posts.search(keyword);
    setSearchedPosts(posts);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // 로그아웃 후 페이지 새로고침
  };

  return (
    <>
      <Header>
        {!isLoggedIn ? (
          <>
            <Link to="/sign_up" className="py-1 px-2 rounded text-sm font-bold">
              회원가입
            </Link>
            <Link to="/login" className="py-1 px-2 rounded text-sm font-bold">
              로그인
            </Link>
          </>
        ) : (
          <>
            <Link to="/my_page" className="py-1 px-2 rounded text-sm font-bold">
              마이페이지
            </Link>
            <button onClick={handleSignOut} className="py-1 px-2 rounded text-sm font-bold">
              로그아웃
            </button>
          </>
        )}
      </Header>
      <article>
        <SearchSection handleSearch={handleSearch} />
        <section>
          {searchedPosts.length !== 0 ? (
            <PostList list={searchedPosts} />
          ) : (
            <>
              <PostList title="인기" list={popularPosts} />
              <PostList title="최신" list={recentPosts} />
            </>
          )}
        </section>
      </article>
      <Footer />
      <Link
        to="/create_post"
        className="fixed right-0 bottom-0 m-2 rounded w-10 h-10 bg-gray-300 flex justify-center items-center hover:bg-white"
      >
        <img src={pencil} className="w-8 hover:opacity-80" />
      </Link>
    </>
  );
}

export default Home;
