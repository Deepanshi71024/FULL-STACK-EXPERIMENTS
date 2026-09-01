import { useEffect, useState } from "react";
import "./App.css";

const platforms = {
  Twitter: {
    limit: 280,
  },
  Instagram: {
    limit: 2200,
  },
  Facebook: {
    limit: 63206,
  },
  LinkedIn: {
    limit: 3000,
  },
};

function App() {
  // -----------------------------
  // STATES
  // -----------------------------

  const [content, setContent] = useState("");

  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "Twitter",
  ]);

  const [drafts, setDrafts] = useState([]);

  const [publishedPosts, setPublishedPosts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");

  // -----------------------------
  // LOAD DRAFTS FROM LOCAL STORAGE
  // -----------------------------

  useEffect(() => {
    const savedDrafts = localStorage.getItem("postDrafts");

    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  // -----------------------------
  // SAVE DRAFTS TO LOCAL STORAGE
  // -----------------------------

  useEffect(() => {
    localStorage.setItem("postDrafts", JSON.stringify(drafts));
  }, [drafts]);

  // -----------------------------
  // SELECT / DESELECT PLATFORM
  // -----------------------------

  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      // Don't allow zero platforms
      if (selectedPlatforms.length === 1) {
        setMessage("Please select at least one platform.");
        return;
      }

      setSelectedPlatforms(
        selectedPlatforms.filter(
          (item) => item !== platform
        )
      );
    } else {
      setSelectedPlatforms([
        ...selectedPlatforms,
        platform,
      ]);
    }

    setMessage("");
  };

  // -----------------------------
  // CHECK VALIDATION
  // -----------------------------

  const isValid = selectedPlatforms.every(
    (platform) =>
      content.length <= platforms[platform].limit
  );

  // -----------------------------
  // SAVE DRAFT
  // -----------------------------

  const saveDraft = () => {
    if (!content.trim()) {
      setMessage(
        "Please write something before saving the draft."
      );
      return;
    }

    if (!isValid) {
      setMessage(
        "Your post exceeds the character limit."
      );
      return;
    }

    // UPDATE EXISTING DRAFT
    if (editingId) {
      setDrafts(
        drafts.map((draft) =>
          draft.id === editingId
            ? {
                ...draft,
                content: content,
                platforms: selectedPlatforms,
                updatedAt:
                  new Date().toLocaleString(),
              }
            : draft
        )
      );

      setMessage(
        "✅ Draft updated successfully!"
      );

      setEditingId(null);
    }

    // CREATE NEW DRAFT
    else {
      const newDraft = {
        id: Date.now(),
        content: content,
        platforms: selectedPlatforms,
        createdAt:
          new Date().toLocaleString(),
      };

      setDrafts([
        newDraft,
        ...drafts,
      ]);

      setMessage(
        "✅ Draft saved successfully!"
      );
    }

    // Clear composer
    setContent("");

    setSelectedPlatforms([
      "Twitter",
    ]);
  };

  // -----------------------------
  // PUBLISH POST
  // -----------------------------

  const publishPost = () => {
    if (!content.trim()) {
      setMessage(
        "Please write something before posting."
      );
      return;
    }

    if (!isValid) {
      setMessage(
        "❌ Cannot post. Character limit exceeded."
      );
      return;
    }

    // Create new published post
    const newPost = {
      id: Date.now(),
      content: content,
      platforms: selectedPlatforms,
      postedAt:
        new Date().toLocaleString(),
    };

    setPublishedPosts([
      newPost,
      ...publishedPosts,
    ]);

    setMessage(
      "🚀 Post published successfully!"
    );

    // Clear composer
    setContent("");

    setSelectedPlatforms([
      "Twitter",
    ]);
  };

  // -----------------------------
  // EDIT DRAFT
  // -----------------------------

  const editDraft = (draft) => {
    setContent(draft.content);

    setSelectedPlatforms(
      draft.platforms
    );

    setEditingId(draft.id);

    setMessage(
      "✏️ Editing draft..."
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // -----------------------------
  // DELETE DRAFT
  // -----------------------------

  const deleteDraft = (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this draft?"
      );

    if (!confirmDelete) {
      return;
    }

    setDrafts(
      drafts.filter(
        (draft) => draft.id !== id
      )
    );

    if (editingId === id) {
      setEditingId(null);
      setContent("");

      setSelectedPlatforms([
        "Twitter",
      ]);
    }

    setMessage(
      "🗑️ Draft deleted successfully!"
    );
  };

  // -----------------------------
  // CLEAR COMPOSER
  // -----------------------------

  const clearComposer = () => {
    setContent("");

    setSelectedPlatforms([
      "Twitter",
    ]);

    setEditingId(null);

    setMessage("");
  };

  // -----------------------------
  // RENDER
  // -----------------------------

  return (
    <div className="app">

      {/* =========================
          HEADER
      ========================== */}

      <header>
        <h1>
          Dynamic Post Composer
        </h1>

        <p>
          Create, validate, publish and
          manage social media posts
        </p>
      </header>


      <main className="container">

        {/* =========================
            POST COMPOSER
        ========================== */}

        <section className="card">

          <div className="section-header">

            <h2>
              {editingId
                ? "Edit Draft"
                : "Create New Post"}
            </h2>

            {editingId && (
              <button
                className="cancel-btn"
                onClick={clearComposer}
              >
                Cancel Edit
              </button>
            )}

          </div>


          {/* PLATFORM SELECTION */}

          <h3>
            Select Platforms
          </h3>

          <div className="platform-grid">

            {Object.keys(platforms).map(
              (platform) => (

                <button
                  key={platform}
                  className={`platform ${
                    selectedPlatforms.includes(
                      platform
                    )
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    togglePlatform(platform)
                  }
                >

                  <strong>
                    {platform}
                  </strong>

                  <span>
                    Limit:{" "}
                    {platforms[platform].limit}{" "}
                    characters
                  </span>

                </button>

              )
            )}

          </div>


          {/* TEXT AREA */}

          <textarea
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder="What do you want to post?"
            rows="8"
          />


          {/* CHARACTER COUNTER */}

          <div className="counter">

            <span>
              Characters:{" "}
              <strong>
                {content.length}
              </strong>
            </span>

            <span>
              Platforms:{" "}
              <strong>
                {selectedPlatforms.length}
              </strong>
            </span>

          </div>


          {/* PLATFORM VALIDATION */}

          <div className="platform-validation">

            {selectedPlatforms.map(
              (platform) => {

                const limit =
                  platforms[platform].limit;

                const remaining =
                  limit - content.length;

                return (
                  <div
                    key={platform}
                    className={
                      remaining < 0
                        ? "validation-error"
                        : "validation-ok"
                    }
                  >

                    <strong>
                      {platform}:
                    </strong>{" "}

                    {remaining >= 0
                      ? `${remaining} characters remaining`
                      : `${Math.abs(
                          remaining
                        )} characters over limit`}

                  </div>
                );
              }
            )}

          </div>


          {/* MESSAGE */}

          {message && (
            <div className="message">
              {message}
            </div>
          )}


          {/* BUTTONS */}

          <div className="actions">

            {/* POST */}

            <button
              className="post-btn"
              onClick={publishPost}
            >
              🚀 Post
            </button>


            {/* SAVE DRAFT */}

            <button
              className="primary-btn"
              onClick={saveDraft}
            >
              💾{" "}
              {editingId
                ? "Update Draft"
                : "Save Draft"}
            </button>


            {/* CLEAR */}

            <button
              className="secondary-btn"
              onClick={clearComposer}
            >
              Clear
            </button>

          </div>

        </section>


        {/* =========================
            PUBLISHED POSTS
        ========================== */}

        <section className="card">

          <div className="section-header">

            <h2>
              Published Posts
            </h2>

            <span className="draft-count">
              {publishedPosts.length} Posts
            </span>

          </div>


          {publishedPosts.length === 0 ? (

            <div className="empty">

              <h3>
                No published posts
              </h3>

              <p>
                Your published posts will
                appear here.
              </p>

            </div>

          ) : (

            <div className="post-list">

              {publishedPosts.map(
                (post) => (

                  <div
                    className="published-post"
                    key={post.id}
                  >

                    <div className="post-header">

                      <strong>
                        Published Post
                      </strong>

                      <span>
                        {post.postedAt}
                      </span>

                    </div>


                    <p className="post-text">
                      {post.content}
                    </p>


                    <div className="post-platforms">

                      {post.platforms.map(
                        (platform) => (

                          <span
                            key={platform}
                          >
                            {platform}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>


        {/* =========================
            DRAFT MANAGEMENT
        ========================== */}

        <section className="card">

          <div className="section-header">

            <h2>
              Saved Drafts
            </h2>

            <span className="draft-count">
              {drafts.length} Drafts
            </span>

          </div>


          {drafts.length === 0 ? (

            <div className="empty">

              <h3>
                No drafts available
              </h3>

              <p>
                Save a post as a draft
                and it will appear here.
              </p>

            </div>

          ) : (

            <div className="draft-list">

              {drafts.map(
                (draft) => (

                  <div
                    className="draft"
                    key={draft.id}
                  >

                    <div className="draft-content">

                      <p>
                        {draft.content}
                      </p>


                      <div className="draft-info">

                        <span>
                          Platforms:{" "}
                          {draft.platforms.join(
                            ", "
                          )}
                        </span>

                        <span>
                          Created:{" "}
                          {draft.createdAt}
                        </span>

                        {draft.updatedAt && (
                          <span>
                            Updated:{" "}
                            {draft.updatedAt}
                          </span>
                        )}

                      </div>

                    </div>


                    <div className="draft-actions">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          editDraft(draft)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteDraft(
                            draft.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================== */}

      <footer>

        <p>
          React.js Post Composer &
          Draft Management System
        </p>

      </footer>

    </div>
  );
}

export default App;