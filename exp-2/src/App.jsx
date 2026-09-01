import { useState } from "react";

import AddPost from "./components/AddPost";
import PostList from "./components/PostList";
import PlatformList from "./components/PlatformList";

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  return (
    <div className="app">
      <h1>Redux Toolkit Post Manager</h1>

      <p>
        Centralized State Management using Redux Toolkit
      </p>

      <AddPost />

      <PlatformList
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
      />

      <PostList
        selectedPlatform={selectedPlatform}
      />
    </div>
  );
}

export default App;