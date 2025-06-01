import React, { useState } from "react";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  function toggleChat() {
    setIsOpen(!isOpen);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    setChatLog((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");

    // Show "Thinking..." while waiting for bot response
    setChatLog((prev) => [...prev, { sender: "bot", text: "Thinking..." }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      // Replace the last "Thinking..." message with actual bot reply
      setChatLog((prev) => {
        const newLog = [...prev];
        const thinkingIndex = newLog.findIndex(
          (msg) => msg.sender === "bot" && msg.text === "Thinking..."
        );
        if (thinkingIndex !== -1) {
          newLog[thinkingIndex] = {
            sender: "bot",
            text: data.reply || "Sorry, no response.",
          };
        } else {
          newLog.push({
            sender: "bot",
            text: data.reply || "Sorry, no response.",
          });
        }
        return newLog;
      });
    } catch (error) {
      // On error, replace Thinking... with error message
      setChatLog((prev) => {
        const newLog = [...prev];
        const thinkingIndex = newLog.findIndex(
          (msg) => msg.sender === "bot" && msg.text === "Thinking..."
        );
        if (thinkingIndex !== -1) {
          newLog[thinkingIndex] = {
            sender: "bot",
            text: "Error getting response.",
          };
        }
        return newLog;
      });
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          borderRadius: "50%",
          width: 60,
          height: 60,
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: 24,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "×" : "💬"}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 320,
            maxHeight: "60vh",
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 999,
          }}
        >
          {/* Chat messages */}
          <div
            style={{
              flex: 1,
              padding: 16,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {chatLog.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user" ? "#007bff" : "#e5e5ea",
                  color: msg.sender === "user" ? "white" : "black",
                  padding: "8px 14px",
                  borderRadius: 20,
                  maxWidth: "70%",
                  wordBreak: "break-word",
                }}
              >
                {msg.text === "Thinking..." ? (
                  <span style={{ display: "flex", gap: 4 }}>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </span>
                ) : (
                  msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                    /^https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)$/i.test(part) ? (
                      <img
                        key={i}
                        src={part}
                        alt="product"
                        style={{ maxWidth: "100%", borderRadius: 8, marginTop: 8 }}
                      />
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )
                )}
              </div>
            ))}
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              borderTop: "1px solid #ddd",
              padding: "8px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                borderRadius: 20,
                border: "1px solid #ccc",
                padding: "8px 12px",
                outline: "none",
                color: "#111",
              }}
            />
            <button
              type="submit"
              style={{
                marginLeft: 8,
                backgroundColor: "#007bff",
                border: "none",
                color: "white",
                borderRadius: 20,
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
