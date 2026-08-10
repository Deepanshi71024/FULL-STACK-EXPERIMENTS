import { useState } from "react";

function Editor() {

  const [content, setContent] =
    useState(
      localStorage.getItem(
        "savedContent"
      ) || ""
    );

  const [message, setMessage] =
    useState("");

  const [lastSaved, setLastSaved] =
    useState(
      localStorage.getItem(
        "lastSaved"
      ) || ""
    );

  const handleSave = () => {

    localStorage.setItem(
      "savedContent",
      content
    );

    const time =
      new Date().toLocaleString();

    localStorage.setItem(
      "lastSaved",
      time
    );

    setLastSaved(time);

    setMessage(
      "✅ Content saved successfully!"
    );

    setTimeout(
      () => setMessage(""),
      3000
    );
  };

  const handleClear = () => {

    setContent("");

    localStorage.removeItem(
      "savedContent"
    );

    localStorage.removeItem(
      "lastSaved"
    );

    setLastSaved("");

    setMessage(
      "🗑️ Content deleted."
    );
  };

  return (
    <div className="container">

      <h1>✏️ Editor Panel</h1>

      <div className="card">

        <h2>Create / Edit Content</h2>

        <textarea
          rows="12"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          placeholder="Write your content here..."
        />

        <div className="button-group">

          <button
            className="primary"
            onClick={handleSave}
          >
            💾 Save Content
          </button>

          <button
            className="danger"
            onClick={handleClear}
          >
            🗑️ Clear
          </button>

        </div>

        {message && (
          <p className="success">
            {message}
          </p>
        )}

        {lastSaved && (
          <p className="saved-time">
            Last saved: {lastSaved}
          </p>
        )}

      </div>

    </div>
  );
}

export default Editor;