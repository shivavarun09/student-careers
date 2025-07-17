import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const UserChatBot = () => {
  const [userQuery, setUserQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, role: "bot", message: "Hello! I'm Gemini AI. Ask me anything!" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  const fetchGeminiResponse = async () => {
    if (!userQuery.trim()) {
      setError("Please enter a message.");
      return;
    }

    // Add user message to chat
    setChatMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user", message: userQuery },
    ]);
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const ai = new GoogleGenerativeAI(apiKey);
      const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(userQuery);
      const text = result.response.text();

      // Add AI response to chat
      setChatMessages((prev) => [
        ...prev,
        { id: prev.length + 1, role: "bot", message: text },
      ]);
      setUserQuery(""); 
    } catch (error) {
      console.error("Gemini API error:", error);
      setError("Failed to fetch response from Gemini AI.");
    } finally {
      setLoading(false);
    }
  };

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchGeminiResponse();
  };

  return (
    <div className="flex flex-col w-full p-3 shadow-lg min-h-svh ">
      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 w-full  overflow-y-auto max-h-[calc(100vh-20px)]"
      >
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${
              msg.role === "user" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="rounded-lg chat-bubble">{msg.message}</div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      {/* Input Form */}
      <form className="w-full mt-4 join" onSubmit={handleSubmit}>
        <label htmlFor="query-input" className="sr-only">
          Chat Input
        </label>
        <input
          id="query-input"
          type="text"
          className="w-full input input-bordered join-item"
          placeholder="Type your message..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          disabled={loading}
          aria-describedby={error ? "error-message" : undefined}
        />
        <button
          type="submit"
          className={`btn join-item ${
            loading ? "btn-disabled" : "btn-primary"
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            "Ask Gemini"
          )}
        </button>
      </form>
    </div>
  );
};

export default UserChatBot;
