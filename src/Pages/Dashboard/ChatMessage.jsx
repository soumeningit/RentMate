import React, { useEffect, useState } from "react";
import { getAllMessagesAPI } from "../../Services/Operation/ChatAPI";
import { useSelector } from "react-redux";

function ChatMessages() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getAllMessagesAPI(user.id, token);
        console.log("Response from API:", response);

        if (data.success) {
          setChats(data.chats);
        } else {
          console.error("Failed to load chats:", data.message);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userId]);

  if (loading) {
    return (
      <div className="text-center p-4 text-gray-600">Loading chats...</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Chat History</h2>
      <div className="space-y-4">
        {chats.length === 0 ? (
          <p className="text-gray-500 text-center">No chats found.</p>
        ) : (
          chats.map((chat, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl shadow-md ${
                chat.senderId === userId
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              <p className="text-sm text-gray-700 mb-1">
                {chat.senderId === userId ? "You" : `User ${chat.senderId}`} ➜{" "}
                {chat.receiverId === userId ? "You" : `User ${chat.receiverId}`}
              </p>
              <p className="text-lg font-medium">{chat.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(chat.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChatMessages;
