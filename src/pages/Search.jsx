import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import PostList from '../components/PostList';
import { SearchInput } from '../components/SearchInput';

function Search() {
  const param = useParams();
  const [searchedPosts, setSearchedPosts] = useState([]); // 검색 결과
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const text = param.keyword;
      console.log(text);
      const posts = await api.posts.search(text);
      setSearchedPosts(posts);
    })();
  }, [param.keyword]);

  const handleSearch = (text) => {
    navigate(`/search/${text}`);
  };

  return (
    <main>
      <SearchInput handleSearch={handleSearch} defaultValue={param.keyword} />
      <section>
        <PostList list={searchedPosts} />
      </section>
    </main>
  );
}

export default Search;
