import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (error) {
      console.error("Fetch error:", error);
      setReply("❌ Could not fetch response from server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Ask Gemini ✨</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your question..."
        rows={5}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? "Loading..." : "Ask"}
      </button>
      <div style={{ marginTop: 20 }}>
        <h3>Response:</h3>
        <pre>{reply}</pre>
      </div>
    </div>
  );
}

export default App;