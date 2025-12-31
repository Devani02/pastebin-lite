"use client";

import { useState } from "react";

export default function HomePage() {
  const [content, setContent] = useState("");
  const [expiresInSeconds, setExpiresInSeconds] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResultUrl("");

    try {
      const res = await fetch("/api/paste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          expiresInSeconds: expiresInSeconds
            ? Number(expiresInSeconds)
            : undefined,
          maxViews: maxViews ? Number(maxViews) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      // setResultUrl(data.url);
      const fullUrl = `${window.location.origin}/p/${data.id}`;
      setResultUrl(fullUrl);
      setContent("");
      setExpiresInSeconds("");
      setMaxViews("");
    } catch {
      setError("Failed to create paste");
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
        Pastebin Lite
      </h1>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          style={{
            width: "100%",
            marginTop: 12,
            padding: 8,
            border: "1px solid #333",
            borderRadius: 4,
          }}
        />

        <div style={{ marginTop: 12 }}>
          <input
            type="number"
            placeholder="Expires in seconds (optional)"
            value={expiresInSeconds}
            onChange={(e) => setExpiresInSeconds(e.target.value)}
            style={{ width: "100%", marginBottom: 8, border: "1px solid #333", padding: 4 }}
          />

          <input
            type="number"
            placeholder="Max views (optional)"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)}
            style={{ width: "100%", border: "1px solid #333", padding: 4 }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: 12,
            padding: "8px 16px",
            cursor: "pointer",
            border: "1px solid #333",
            borderRadius: 4,
            background: "#0eaed6ff",
          }}
        >
          Create Paste
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: 12 }}>{error}</p>
      )}

      {resultUrl && (
        <p style={{ marginTop: 12 }}>
          Shareable link:{" "}
          <a href={resultUrl} target="_blank">
            {resultUrl}
          </a>
        </p>
      )}
    </main>
  );
}
