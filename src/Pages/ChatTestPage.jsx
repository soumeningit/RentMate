import React from "react";
import ChatComponent from "../Components/ChatComponent";

function ChatTestPage() {
  const hardcodedUserId = "101";
  const hardcodedReceiverId = "202";

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-6">Chat Testing</h1>
      <ChatComponent
        userId={hardcodedUserId}
        receiverId={hardcodedReceiverId}
      />
    </div>
  );
}

export default ChatTestPage;
