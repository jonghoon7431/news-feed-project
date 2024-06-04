import PostItem from './PostItem';

function PostList({ title, list }) {
  return (
    <section className="bg-gray-100 pl-3 mb-2">
      {title ? <h2 className="py-3 font-bold">{title}</h2> : ''}
      <ul>
        {list.map((post, i) => (
          <li key={i}>
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PostList;
