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
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={input}
          placeholder="Ask something..."
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 20,
            border: "1px solid #ccc",
            width: "100%",
            maxWidth: 400,
            fontSize: 16,
          }}
        />
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
