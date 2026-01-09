export default function Sidebar() {
  return (
    <aside
      style={{
        width: 240,
        background: "#eef0f3", // slightly darker than page bg
        borderRight: "1px solid #d1d5db",
        padding: "16px 12px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#6b7280",
          marginBottom: 12,
        }}
      >
        NAVIGATION
      </div>

      {/* Active item */}
      <div
        style={{
          padding: "8px 10px",
          borderRadius: 4,
          background: "#ffffff",
          border: "1px solid #d1d5db",
          fontWeight: 600,
          color: "#111827",
          marginBottom: 6,
        }}
      >
        Code Review
      </div>

      {/* Disabled / placeholder item */}
      <div
        style={{
          padding: "8px 10px",
          borderRadius: 4,
          color: "#9ca3af",
        }}
      >
        Settings
      </div>
    </aside>
  );
}
