import { useSelector } from "react-redux";
import { selectPostsByPlatform } from "../features/posts/postSelectors";

function PostList({ selectedPlatform }) {
  const posts = useSelector((state) =>
    selectPostsByPlatform(state, selectedPlatform)
  );

  return (
    <div>
      <h2>Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div className="post-card" key={post.id}>
            <h3>{post.title}</h3>

            <p>{post.content}</p>

            <small>Platform: {post.platformName}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;