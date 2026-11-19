
const tabs = [
  {
    id: "home",
    label: "Home",
    icon: "⌂"
  },
  {
    id: "discover",
    label: "Discover",
    icon: "♡"
  },
  {
    id: "matches",
    label: "Matches",
    icon: "♥"
  }
];

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <nav className="tab-bar">

      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={
            activeTab === tab.id
              ? "tab active"
              : "tab"
          }
          onClick={() => onTabChange(tab.id)}
        >

          <span className="tab-icon">
            {tab.icon}
          </span>

          <span className="tab-label">
            {tab.label}
          </span>

          {activeTab === tab.id && (
            <span className="tab-indicator"></span>
          )}

        </button>
      ))}

    </nav>
  );
}
