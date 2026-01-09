type Props = {
  issue: any;
};

export default function StyleIssueCard({ issue }: Props) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        background: "#fafafa",
        padding: 12,
        marginBottom: 10,
      }}
    >
      <strong>{issue.rule}</strong> (Line {issue.line})
      <p>{issue.issue}</p>

      <pre style={{ background: "#f3f4f6", padding: 8 }}>
        Before: {issue.before}
      </pre>
      <pre style={{ background: "#ecfeff", padding: 8 }}>
        After:  {issue.after}
      </pre>
    </div>
  );
}
