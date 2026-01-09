type Props = {
  issue: any;
};

export default function LogicIssueCard({ issue }: Props) {
  return (
    <div
      style={{
        border: "1px solid #f5c2c2",
        borderLeft: "6px solid #dc2626",
        background: "#fff5f5",
        padding: 12,
        marginBottom: 12,
      }}
    >
      <strong>⚠ {issue.severity}</strong>
      <p style={{ marginTop: 6 }}>{issue.issue}</p>

      <p>
        <em>{issue.recommendation}</em>
      </p>

      <pre
        style={{
          background: "#ffe4e6",
          padding: 10,
          overflowX: "auto",
        }}
      >
        {issue.fix_snippet}
      </pre>
    </div>
  );
}
