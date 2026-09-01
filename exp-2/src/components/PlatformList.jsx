import { useSelector } from "react-redux";

function PlatformList({ selectedPlatform, setSelectedPlatform }) {
  const platforms = useSelector((state) =>
    state.platforms.ids.map(
      (id) => state.platforms.entities[id]
    )
  );

  return (
    <div className="platform-container">
      <h2>Platforms</h2>

      {platforms.map((platform) => (
        <button
          key={platform.id}
          className={selectedPlatform === platform.id ? "active" : ""}
          onClick={() => setSelectedPlatform(platform.id)}
        >
          {platform.name}
        </button>
      ))}

      <button
        className={selectedPlatform === "all" ? "active" : ""}
        onClick={() => setSelectedPlatform("all")}
      >
        All
      </button>
    </div>
  );
}

export default PlatformList;