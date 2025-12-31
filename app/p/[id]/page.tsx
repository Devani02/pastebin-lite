"use client";

import { useEffect, useState } from "react";

export default function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPaste() {
      const { id } = await params;

      try {
        const res = await fetch(`/api/paste/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "PaGE not found");
          return;
        }

        setContent(data.content);
      } catch {
        setError("Failed to load page");
      }
    }

    fetchPaste();
  }, [params]);

  if (error) {
    return (
      <main style={{ maxWidth: 600, margin: "40px auto" }}>
        <p style={{ color: "red" }}>Page {error}</p>
      </main>
    );
  }

  if (!content) {
    return (
      <main style={{ maxWidth: 600, margin: "40px auto" }}>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1 style={{ fontSize: 20, fontWeight: "bold" }}>
        Paste Content
      </h1>

      <pre
        style={{
          marginTop: 12,
          padding: 12,
          background: "#595b5bff",
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </pre>
    </main>
  );
}
