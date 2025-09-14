import React, { useState, useEffect, useRef } from "react";

function ChatComponent({ userId, receiverId }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection
    socketRef.current = new WebSocket(
      `ws://localhost:8080/server/chat/${userId}`
    );

    socketRef.current.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socketRef.current.onmessage = (event) => {
      setChat((prev) => [...prev, event.data]);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socketRef.current.close();
    };
  }, [userId]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socketRef.current.send(`${receiverId}:${message}`);
      setChat((prev) => [...prev, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">
        Chat with user {receiverId}
      </h2>
      <div className="chat-box border p-2 h-64 overflow-y-auto bg-gray-50 mb-2 rounded">
        {chat.map((msg, i) => (
          <p key={i} className="mb-1">
            {msg}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
