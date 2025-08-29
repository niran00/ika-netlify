"use client"
import { X, Send, Sparkles } from "lucide-react"
import Image from "next/image"

export default function ChatModal({ isOpen, onClose, chatLog, input, setInput, handleSubmit, productCards }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-7xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
               <img src="/logo.webp" width="80px"  />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Shopping Assistant</h1>
              <p className="text-sm text-gray-500">Powered by advanced AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex h-[calc(100%-88px)]">
          {/* Chat Section - Left Side */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatLog.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to AI Shopping</h3>
                  <p className="text-gray-600 max-w-md">
                    Ask me anything about products, get personalized recommendations, or let me help you find exactly
                    what you're looking for.
                  </p>
                </div>
              ) : (
                chatLog.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                          : "bg-white text-gray-800 shadow-sm border border-gray-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-white border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about products, styles, or anything..."
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  <span className="font-medium">Send</span>
                </button>
              </form>
            </div>
          </div>

          {/* Results Section - Right Side */}
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recommendations</h2>
              <p className="text-sm text-gray-500 mt-1">Curated just for you</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {productCards.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <img src="/logo.webp" width="80px"  />
                  </div>
                  <p className="text-gray-500 text-sm">Start chatting to get personalized product recommendations</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {productCards.map((prod, idx) => (
                    <div
                      key={idx}
                      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={prod.image || "/placeholder.svg"}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{prod.title}</h3>
                        <p className="text-blue-600 font-bold text-lg">{prod.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
