import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getAllMessagesAPI } from "../../Services/Operation/ChatAPI";

function Notifications() {
  const { token, user } = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await getAllMessagesAPI(user.id, token);
        if (response.status === 200) {
          setChats(response.data.chats);
        }
      } catch (err) {
        console.error("Error fetching chats", err);
      }
    }
    fetchMessages();
  }, [user, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, selectedUser]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const messageObj = {
      senderId: user.id.toString(),
      senderName: user.name,
      receiverId: selectedUser.userId,
      receiverName: selectedUser.userName,
      message: newMessage,
      timestamp: { $date: new Date().toISOString() },
    };

    setChats([...chats, messageObj]);
    setNewMessage("");
    // You can also send to backend here: sendMessageAPI(messageObj, token);
  };

  // Extract unique conversation users
  const uniqueUsers = [
    ...new Map(
      chats.map((chat) => {
        const isSender = chat.senderId === user.id.toString();
        const userId = isSender ? chat.receiverId : chat.senderId;
        const userName = isSender ? chat.receiverName : chat.senderName;
        return [userId, { userId, userName }];
      })
    ).values(),
  ];

  // Filter messages for selected user
  const filteredChats = selectedUser
    ? chats.filter(
        (chat) =>
          (chat.senderId === user.id.toString() &&
            chat.receiverId === selectedUser.userId) ||
          (chat.receiverId === user.id.toString() &&
            chat.senderId === selectedUser.userId)
      )
    : [];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white px-6 py-4 font-semibold text-lg shadow">
        {selectedUser
          ? `Chat with ${selectedUser.userName}`
          : "Select a user to chat"}
      </div>

      <div className="flex flex-row flex-1">
        {/* Left Sidebar */}
        <div className="w-60 p-4 bg-gray-200 shadow-lg overflow-y-auto">
          {uniqueUsers.map((chatUser, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg cursor-pointer hover:bg-green-100 ${
                selectedUser?.userId === chatUser.userId
                  ? "bg-green-300"
                  : "bg-white"
              }`}
              onClick={() => setSelectedUser(chatUser)}
            >
              <p className="text-sm font-medium">{chatUser.userName}</p>
            </div>
          ))}
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
            {selectedUser ? (
              filteredChats.map((chat, index) => {
                const isMe = chat.senderId === user.id.toString();
                return (
                  <div
                    key={index}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl ${
                        isMe
                          ? "bg-green-200 text-right rounded-br-none"
                          : "bg-gray-100 text-left rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{chat.message}</p>
                      <div className="text-[10px] text-gray-500 mt-1">
                        {new Date(chat.timestamp.$date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400 text-sm">No user selected</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          {selectedUser && (
            <div className="flex items-center px-4 py-3 bg-white border-t gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
