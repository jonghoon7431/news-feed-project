import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import pencil from '../assets/pencil.png';
import PostList from '../components/PostList';
import RecentPosts from '../components/RecentPosts';
import { SearchInput } from '../components/SearchInput';

function Home() {
  const [popularPosts, setPopularPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setPopularPosts(await api.posts.getPopularPosts());
    })();
  }, []);

  const handleSearch = async (keyword) => {
    navigate(`/search/${keyword}`);
  };

  return (
    <main>
      <SearchInput handleSearch={handleSearch} />
      <section>
        <PostList title="인기" list={popularPosts} />
        <RecentPosts />
      </section>
      <Link
        to="/create_post"
        className="fixed right-0 bottom-0 m-2 rounded w-10 h-10 bg-gray-300 flex justify-center items-center hover:bg-white"
      >
        <img src={pencil} className="w-8 hover:opacity-80" />
      </Link>
    </main>
  );
}

export default Home;
