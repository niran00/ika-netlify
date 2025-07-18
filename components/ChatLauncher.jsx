"use client"

import React, { useState } from "react"
import ChatModal from "./ChatModal"

export default function ChatLauncher() {
  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [productCards, setProductCards] = useState([])

  // Extract products in [Title](ImageURL) format with "Price: $..."
  function extractProductsFromText(text) {
    const productRegex = /\[([^\]]+)\]\((https?:\/\/[^\s]+?\.(?:png|jpe?g|webp|gif|webp))\)[\s\S]*?Price:\s?\$?([\d,]+)/gi
    const matches = []
    let match

    while ((match = productRegex.exec(text)) !== null) {
      matches.push({
        title: match[1],
        image: match[2],
        price: `$${match[3]}`,
      })
    }

    return matches
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const message = input.trim()
    if (!message) return

    setInput("")
    setModalOpen(true)

    // Add user's message and "Thinking..." to chat log
    setChatLog((prev) => [
      ...prev,
      { sender: "user", text: message },
      { sender: "bot", text: "Thinking..." },
    ])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()
      const reply = data.reply || "No response"

      // Extract product cards from bot reply
      const products = extractProductsFromText(reply)
      setProductCards(products)

      // Replace "Thinking..." with the real bot reply
      setChatLog((prev) => {
        const updated = [...prev]
        const thinkingIndex = updated.findIndex(
          (msg) => msg.sender === "bot" && msg.text === "Thinking..."
        )
        if (thinkingIndex !== -1) {
          updated[thinkingIndex] = { sender: "bot", text: reply }
        } else {
          updated.push({ sender: "bot", text: reply })
        }
        return updated
      })
    } catch (err) {
      setChatLog((prev) => {
        const updated = [...prev]
        const thinkingIndex = updated.findIndex(
          (msg) => msg.sender === "bot" && msg.text === "Thinking..."
        )
        if (thinkingIndex !== -1) {
          updated[thinkingIndex] = {
            sender: "bot",
            text: "Error getting response.",
          }
        }
        return updated
      })
      setProductCards([])
    }
  }

  return (
    <>
      
      <form
  onSubmit={handleSubmit}
  style={{
    position: "relative",
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
  }}
>
  <input
    type="text"
    value={input}
    placeholder="Ask something..."
    onChange={(e) => setInput(e.target.value)}
    style={{
      padding: "12px 48px 12px 16px", // extra right padding for the button
      borderRadius: 20,
      border: "1px solid #ccc",
      width: "100%",
      fontSize: 16,
    }}
  />

  <button
    type="submit"
    style={{
      position: "absolute",
      top: "50%",
      right: 12,
      transform: "translateY(-50%)",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      padding: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#555",
    }}
    aria-label="Send"
  >
    {/* Search Icon (you can change this to a paper plane or something else) */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      style={{ width: 20, height: 20 }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
      />
    </svg>
  </button>
</form>


      <ChatModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        chatLog={chatLog}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        productCards={productCards}
      /> 
    </>
  )
}
