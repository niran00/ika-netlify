"use client"

import React, { useState, useEffect, useRef } from "react"

export default function ChatUI() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([])
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatLog])

  function handleLauncherInput(e) {
    setInput(e.target.value)
    if (!isOpen && e.target.value.trim()) {
      setIsOpen(true)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim()) return

    setChatLog(prev => [...prev, { sender: "user", text: input }])
    setInput("")
    setChatLog(prev => [...prev, { sender: "bot", text: "Thinking..." }])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()

      setChatLog(prev => {
        const updated = [...prev]
        const index = updated.findIndex(msg => msg.sender === "bot" && msg.text === "Thinking...")
        if (index !== -1) {
          updated[index] = { sender: "bot", text: data.reply || "No response" }
        }
        return updated
      })
    } catch (err) {
      setChatLog(prev => {
        const updated = [...prev]
        const index = updated.findIndex(msg => msg.sender === "bot" && msg.text === "Thinking...")
        if (index !== -1) {
          updated[index] = { sender: "bot", text: "Error retrieving response." }
        }
        return updated
      })
    }
  }

  return (
    <>
      {/* Launcher Input */}
      {!isOpen && (
        <div style={{ position: "relative", padding: "1rem" }}>
          <input
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={handleLauncherInput}
            style={{
              padding: "12px 16px",
              borderRadius: 20,
              border: "1px solid #ccc",
              width: "100%",
              maxWidth: 400,
              fontSize: 16,
            }}
          />
        </div>
      )}

      {/* Fullscreen Chat UI */}
      {isOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#f8f8f8",
          display: "flex",
          zIndex: 9999,
        }}>
          {/* Chat Section */}
          <div style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            borderRight: "1px solid #ddd",
          }}>
            <h2 style={{ marginBottom: 20 }}>💬 Chat</h2>
            <div style={{ flex: 1 }}>
              {chatLog.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    backgroundColor: msg.sender === "user" ? "#007bff" : "#e5e5ea",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    padding: "10px 16px",
                    borderRadius: 20,
                    marginBottom: 10,
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} style={{ marginTop: "auto", display: "flex", gap: 8 }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: 20,
                  border: "1px solid #ccc",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "12px 20px",
                  borderRadius: 20,
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </form>
          </div>

          {/* Product Suggestions Section */}
          <div style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            backgroundColor: "#fafafa",
          }}>
            <h2 style={{ marginBottom: 20 }}>🛍️ Related Products</h2>
            {[1, 2, 3].map((num) => (
              <div key={num} style={{ marginBottom: 20 }}>
                <img
                  src={`https://via.placeholder.com/300x200?text=Product+${num}`}
                  alt={`Product ${num}`}
                  style={{ width: "100%", borderRadius: 12 }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
