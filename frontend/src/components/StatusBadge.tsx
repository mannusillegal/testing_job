type Props = {
  status: "APPROVED" | "NEEDS_REVISION";
  score: number;
};

export default function StatusBadge({ status, score }: Props) {
  const isApproved = status === "APPROVED";

  return (
    <div
      style={{
        padding: "12px 16px",
        marginBottom: 20,
        borderRadius: 6,
        background: isApproved ? "#e6fffa" : "#fff1f2",
        border: `1px solid ${isApproved ? "#81e6d9" : "#fecaca"}`,
      }}
    >
      <h3 style={{ margin: 0 }}>
        Status:{" "}
        <span style={{ color: isApproved ? "#065f46" : "#991b1b" }}>
          {status}
        </span>
      </h3>
      <p style={{ margin: "6px 0 0 0" }}>Score: {score} / 10</p>
    </div>
  );
}
