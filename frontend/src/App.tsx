import { useState, useRef } from "react";
import { reviewCode } from "./api/review";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatusBadge from "./components/StatusBadge";
import StyleIssueCard from "./components/StyleIssueCard";
import LogicIssueCard from "./components/LogicIssueCard";

type WorkflowState = "INPUT" | "RUNNING" | "REVIEWED";

const COLORS = {
  pageBg: "#f3f4f6",
  surfaceBg: "#ffffff",
  border: "#e5e7eb",
  subtleText: "#6b7280",
  primary: "#2563eb",
  muted: "#9ca3af",
};

export default function App() {
  const [workflow, setWorkflow] = useState<WorkflowState>("INPUT");
  const [code, setCode] = useState("def add(a,b):return a+b");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [showRaw, setShowRaw] = useState(false);

  const [fileName, setFileName] = useState<string | null>(null);
  const [readOnly, setReadOnly] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function runReview() {
    setWorkflow("RUNNING");
    setResult(null);
    setError(null);
    setShowRaw(false);

    try {
      const res = await reviewCode(code);
      setResult(res);
      setWorkflow("REVIEWED");
    } catch (err) {
      setError(err);
      setWorkflow("INPUT");
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCode(reader.result as string);
      setFileName(file.name);
      setWorkflow("INPUT");
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  }

  return (
    <div style={{ height: "100vh", background: COLORS.pageBg }}>
      <Header />

      <div
        style={{
          display: "flex",
          height: "calc(100vh - 56px)",
          overflow: "hidden",
        }}
      >
        <Sidebar />

        {/* MAIN WORK SURFACE */}
        <main
          style={{
            flex: 1,
            background: COLORS.surfaceBg,
            borderLeft: `1px solid ${COLORS.border}`,
            padding: "24px 48px", // reduced vertical, wider horizontal
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          {/* MODULE HEADER */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: 0 }}>Code Review</h2>
            <p style={{ color: COLORS.subtleText, marginTop: 4 }}>
              Static analysis and governance review for uploaded code
            </p>
            <div style={{ fontSize: 12, color: COLORS.muted }}>
              Mode: Single-file review · Environment: Local
            </div>
          </div>

          {/* INPUT */}
          <section
            style={{
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
              padding: 24,
              background: "#fafafa",
              marginBottom: 32,
              width: "calc(100% - 12px)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Input</h3>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              disabled={workflow === "RUNNING"}
            />

            {fileName && (
              <div style={{ fontSize: 12, color: COLORS.subtleText }}>
                Loaded file: <strong>{fileName}</strong>
              </div>
            )}

            <div style={{ margin: "12px 0" }}>
              <label style={{ fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={readOnly}
                  onChange={() => setReadOnly(!readOnly)}
                />{" "}
                Lock editor
              </label>
            </div>

          <textarea
            rows={workflow === "REVIEWED" ? 6 : 14}
            readOnly={readOnly || workflow === "RUNNING"}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",   // ✅ FIX: prevents overflow
              fontFamily: "monospace",
              fontSize: 14,
              padding: 14,
              borderRadius: 6,
              border: `1px solid ${COLORS.border}`,
              background:
                workflow === "RUNNING" ? "#f9fafb" : COLORS.surfaceBg,
            }}
          />


            <div style={{ marginTop: 16 }}>
              <button
                onClick={runReview}
                disabled={workflow === "RUNNING"}
                style={{
                  background: COLORS.primary,
                  color: "#ffffff",
                  padding: "10px 18px",
                  borderRadius: 6,
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {workflow === "RUNNING"
                  ? "Running Review…"
                  : "Run Code Review"}
              </button>
            </div>
          </section>

          {/* RESULTS */}
          {workflow === "REVIEWED" && result && (
            <section style={{ width: "100%" }}>
              <h3>Review Report</h3>

              <StatusBadge
                status={result.evaluation.status}
                score={result.evaluation.score}
              />

              <h4>Style Issues</h4>
              {result.review.formatted_issues.length === 0 ? (
                <p>✅ No style issues</p>
              ) : (
                result.review.formatted_issues.map((issue: any, i: number) => (
                  <StyleIssueCard key={i} issue={issue} />
                ))
              )}

              <h4>Logic & Runtime Issues</h4>
              {result.logic.logic_issues.length === 0 ? (
                <p>✅ No logic issues</p>
              ) : (
                result.logic.logic_issues.map((issue: any, i: number) => (
                  <LogicIssueCard key={i} issue={issue} />
                ))
              )}

              <button
                style={{ marginTop: 20 }}
                onClick={() => setShowRaw(!showRaw)}
              >
                {showRaw ? "Hide Raw JSON" : "Show Raw JSON"}
              </button>

              {showRaw && (
                <pre
                  style={{
                    marginTop: 10,
                    background: "#f6f6f6",
                    padding: 12,
                    fontSize: 12,
                    overflowX: "auto",
                  }}
                >
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
