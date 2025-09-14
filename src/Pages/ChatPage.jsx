/* // WORKING CODE without show online status and typing status
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverId, setReceiverId] = useState("");

  const ws = useRef(null);

  const { product_id, user } = useParams();
  const productId = product_id?.split("_")[1] || "unknown";

  const userName = user?.split("-")[0] || "anonymous";
  const userId = user?.split("-")[1] || "0";
  const username = useRef(userName);

  console.log("username : " + JSON.stringify(username));

  console.log("userName", userName);
  console.log("userId", userId);

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://localhost:8080/server/chat/${userName}/${userId}`
    );

    ws.current.onmessage = (event) => {
      const msgObj = JSON.parse(event.data);

      if (msgObj.type === "init") {
        console.log("msgObj from init ", msgObj);
        setReceiverName(msgObj?.users[0]?.username);
        setReceiverId(msgObj.users[0].userId);
      } else {
        setMessages((prev) => [...prev, msgObj]);
      }
    };

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const msgObj = {
        user: username.current,
        text: input,
        product_id: productId,
        receiverId: receiverId || null,
      };
      ws.current.send(JSON.stringify(msgObj));
      setInput("");
    }
  };

  console.log("receiverName", receiverName);
  console.log("receiverId", receiverId);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-bold text-center mb-4">
          {receiverName
            ? `💬 Chat with ${receiverName.replace("_", " ")}`
            : "Loading..."}
        </h2>

        <div className="h-80 overflow-y-scroll border rounded p-2 mb-4 bg-gray-50">
          {messages.map(
            (msg, idx) => (
              console.log("msg", msg),
              console.log("msg.user", msg.user),
              console.log("username.current", username.current),
              (
                <div
                  key={`${msg.timestamp}-${idx}`}
                  className={`mb-2 flex ${
                    msg.user === username.current
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-lg text-white ${
                      msg.user === username.current
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  >
                    <span className="block text-base">{msg.text}</span>
                    <span className="block text-sm font-semibold">
                      {msg.user.split("_")[0]}
                    </span>
                  </div>
                </div>
              )
            )
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
*/

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [isReceiverOnline, setIsReceiverOnline] = useState(false);
  const [isReceiverTyping, setIsReceiverTyping] = useState(false);

  const typingTimeoutRef = useRef(null);

  const ws = useRef(null);
  const { product_id, user } = useParams();

  const name = user.firstName + " " + user.lastName;

  const productId = product_id?.split("_")[1] || "unknown";
  const userName = user?.split("-")[0] || "anonymous";
  const userId = user?.split("-")[1] || "0";

  const username = useRef(userName);

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://localhost:8080/server/chat/${userName}/${userId}`
    );

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.current.onmessage = (event) => {
      const msgObj = JSON.parse(event.data);

      if (msgObj.type === "init") {
        console.log("msgObj from init ", msgObj);
        if (msgObj?.users[0]) {
          setReceiverName(msgObj.users[0].username);
          setReceiverId(msgObj.users[0].userId);
          setIsReceiverOnline(true);
        }
      } else if (msgObj.type === "typing") {
        if (msgObj.senderId === receiverId) {
          setIsReceiverTyping(true);

          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(() => {
            setIsReceiverTyping(false);
          }, 1500);
        }
      } else {
        if (msgObj.receiverId === userId || msgObj.senderId === userId) {
          setMessages((prev) => [...prev, msgObj]);
        }
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed");
      setIsReceiverOnline(false);
    };

    return () => {
      ws.current.close();
    };
  }, [receiverId, userId, userName]);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const msgObj = {
        user: username.current,
        senderId: userId,
        text: input,
        product_id: productId,
        receiverId: receiverId || null,
        receiverName: receiverName,
      };
      ws.current.send(JSON.stringify(msgObj));
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-bold text-center mb-2">
          {receiverName ? (
            <div className="flex flex-col items-center">
              <span>💬 Chat with {receiverName.replace("_", " ")}</span>
              <span className="text-sm font-medium text-gray-500">
                {isReceiverOnline ? "🟢 Online" : "⚫ Offline"}
              </span>
            </div>
          ) : (
            "Loading..."
          )}
        </h2>

        <div className="h-80 overflow-y-scroll border rounded p-2 mb-2 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={`${msg.timestamp}-${idx}`}
              className={`mb-2 flex ${
                msg.user === username.current ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-3 py-2 rounded-lg text-white ${
                  msg.user === username.current ? "bg-blue-500" : "bg-green-500"
                }`}
              >
                <span className="block text-base">{msg.text}</span>
                <span className="block text-sm font-semibold">
                  {msg.user.split("_")[0]}
                </span>
              </div>
            </div>
          ))}
          {isReceiverTyping && (
            <div className="text-sm text-gray-500 italic mt-2">
              {receiverName?.split("_")[0]} is typing...
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // handleTyping();
            }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
