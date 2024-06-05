import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import pencil from '../assets/pencil.png';
import PostList from '../components/PostList';
import RecentPosts from '../components/RecentPosts';
import { SearchBox } from '../components/Search';

function Home() {
  const [searchedPosts, setSearchedPosts] = useState([]); // 검색 결과
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    (async () => {
      setPopularPosts(await api.posts.getPopularPosts());
    })();
  }, []);

  const handleSearch = async (keyword) => {
    const posts = await api.posts.search(keyword);
    setSearchedPosts(posts);
  };

  return (
    <main>
      <SearchBox handleSearch={handleSearch} />
      <section>
        {searchedPosts.length !== 0 ? (
          <PostList list={searchedPosts} />
        ) : (
          <>
            <PostList title="인기" list={popularPosts} />
            <RecentPosts />
          </>
        )}
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
