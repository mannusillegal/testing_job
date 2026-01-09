export default function Header() {
  return (
    <header
      style={{
        width: "100vw",
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 20,
        boxSizing: "border-box",
      }}
    >
      {/* Left: App Identity */}
      <div>
        <div style={{ fontWeight: 700 }}>DevOps Buddy</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>
          Code Review Agent
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right: User Profile */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#2563eb",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          B
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Bob</div>
          <div
            style={{
              fontSize: 11,
              color: "#2563eb",
              background: "#eef2ff",
              padding: "2px 6px",
              borderRadius: 4,
              display: "inline-block",
              marginTop: 2,
            }}
          >
            Local
          </div>
        </div>
      </div>
    </header>
  );
}
