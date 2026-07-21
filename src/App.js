import React, { useState } from "react";
import "./App.css";

function App() {
  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");

  const [drafts, setDrafts] = useState([]);
  const [posts, setPosts] = useState([]);

  const limits = {
    Twitter: 280,
    Facebook: 6320,
    Telegram: 409,
  };

  const currentLimit = limits[platform];
  const remaining = currentLimit - post.length;

  const getMessage = () => {
    if (post.length === 0) {
      return "Start typing your post...";
    }

    if (post.length > currentLimit) {
      return `❌ Character limit exceeded by ${
        post.length - currentLimit
      } characters.`;
    }

    return `✅ Valid post! ${remaining} characters remaining.`;
  };

  // Save Draft
  const saveDraft = () => {
    if (post.trim() === "") return;

    const draft = {
      id: Date.now(),
      platform,
      text: post,
    };

    setDrafts([...drafts, draft]);
    setPost("");
  };

  // Publish Current Post
  const publishPost = () => {
    if (post.trim() === "") return;

    const newPost = {
      id: Date.now(),
      platform,
      text: post,
      time: new Date().toLocaleString(),
    };

    setPosts([...posts, newPost]);
    setPost("");
  };

  // Publish Draft
  const publishDraft = (draft) => {
    const newPost = {
      ...draft,
      time: new Date().toLocaleString(),
    };

    setPosts([...posts, newPost]);
    setDrafts(drafts.filter((d) => d.id !== draft.id));
  };

  // Edit Draft
  const editDraft = (draft) => {
    setPlatform(draft.platform);
    setPost(draft.text);
    setDrafts(drafts.filter((d) => d.id !== draft.id));
  };

  // Delete Draft
  const deleteDraft = (id) => {
    setDrafts(drafts.filter((d) => d.id !== id));
  };

  return (
    <div className="container">
      <h1>Social Media Validation</h1>

      <label>Select Platform</label>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Twitter</option>
        <option>Facebook</option>
        <option>Telegram</option>
      </select>

      <br />
      <br />

      <textarea
        rows="8"
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <h3>
        Characters: {post.length} / {currentLimit}
      </h3>

      <p
        style={{
          color: post.length > currentLimit ? "red" : "green",
          fontWeight: "bold",
        }}
      >
        {getMessage()}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <button onClick={saveDraft} disabled={post.length === 0}>
          Save Draft
        </button>

        <button
          onClick={publishPost}
          disabled={post.length > currentLimit || post.length === 0}
        >
          Publish Post
        </button>
      </div>

      <hr />

      <h2>📝 Drafts</h2>

      {drafts.length === 0 ? (
        <p>No Drafts Available</p>
      ) : (
        drafts.map((draft) => (
          <div
            key={draft.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            <h4>{draft.platform}</h4>

            <p>{draft.text}</p>

            <button onClick={() => editDraft(draft)}>Edit</button>

            <button
              onClick={() => publishDraft(draft)}
              style={{ marginLeft: "10px" }}
            >
              Publish
            </button>

            <button
              onClick={() => deleteDraft(draft.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}

      <hr />

      <h2>📢 Published Posts</h2>

      {posts.length === 0 ? (
        <p>No Posts Published Yet</p>
      ) : (
        posts.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #4CAF50",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              textAlign: "left",
              backgroundColor: "#f9fff9",
            }}
          >
            <h4>{item.platform}</h4>

            <p>{item.text}</p>

            <small>
              <b>Published:</b> {item.time}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default App;