export function FormSubmissionsLink() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 16,
        padding: 40,
        textAlign: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: "#6b7280" }}
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
      <div>
        <p style={{ fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>
          Form Submissions Dashboard
        </p>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px" }}>
          View, search and filter all form submissions
        </p>
        <a
          href="/api/enable-internal"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-block",
            padding: "8px 20px",
            backgroundColor: "#111827",
            color: "#fff",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Open Dashboard ↗
        </a>
      </div>
    </div>
  );
}
