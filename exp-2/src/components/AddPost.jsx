import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/posts/postsSlice";

function AddPost() {
  const dispatch = useDispatch();

  const platforms = useSelector((state) =>
    state.platforms.ids.map(
      (id) => state.platforms.entities[id]
    )
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platformId, setPlatformId] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content");
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    dispatch(
      addPost(
        title.trim(),
        content.trim(),
        Number(platformId)
      )
    );

    setTitle("");
    setContent("");
    setPlatformId(1);

    window.setTimeout(() => {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="form-container">
      <h2>Add New Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          value={platformId}
          onChange={(e) => setPlatformId(e.target.value)}
        >
          {platforms.map((platform) => (
            <option
              key={platform.id}
              value={platform.id}
            >
              {platform.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}

export default AddPost;