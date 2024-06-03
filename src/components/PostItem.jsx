/**
 *
 * @param post
 * @returns
 */
function PostItem({ post }) {
  return (
    <article>
      <title>{post.title}</title>
      <span>{post.view}</span>
      <span>{post.like}</span>
    </article>
  );
}

export default PostItem;
