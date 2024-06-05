import { useCallback, useEffect, useState } from 'react';
import api from '../api/api';
import PostList from './PostList';

const POSTS_ROWNUM = 13;

function RecentPosts() {
  const [pageNo, setPageNo] = useState(0);
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    (async () => {
      api.posts.getRecentPosts({ startNo: pageNo, rownum: POSTS_ROWNUM }).then((list) => {
        if (list.length === 0) {
          setHasNextPage(false);
          return;
        }
        setPosts((posts) => [...posts, ...list]);
      });
    })();
  }, [pageNo]);

  const handleScrollEvent = useCallback(async () => {
    const element = document.documentElement;
    const scorllableHeight = element.scrollHeight - element.clientHeight;
    const restScrollHeight = scorllableHeight - scrollY;
    if (!hasNextPage || restScrollHeight > 5) {
      return;
    }
    setPageNo((pageNo) => pageNo + POSTS_ROWNUM + 1);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return <PostList title="최신 글" list={posts} />;
}

export default RecentPosts;
