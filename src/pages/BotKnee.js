import React, { useState } from "react";
import "./BotKnee.css";

const BotKnee = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const appendMessage = (text, sender) => {
    setMessages((prev) => [...prev, { text, sender }]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    appendMessage(input, "user");
    setInput("");
    appendMessage("Typing...", "bot-typing");

    try {
      const response = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "user123",
          message: input,
        }),
      });

      const data = await response.json();
      setMessages((prev) =>
        prev.filter((msg) => msg.sender !== "bot-typing")
      );

      if (data.response) {
        appendMessage(data.response, "bot");
      } else {
        appendMessage("⚠️ Error from API: No valid response", "bot");
      }
    } catch (err) {
      setMessages((prev) =>
        prev.filter((msg) => msg.sender !== "bot-typing")
      );
      appendMessage("🚨 Server Error: " + err.message, "bot");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">🦿 KneeRevive Assistant</div>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default BotKnee;
