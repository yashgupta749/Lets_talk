import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt);
  const isMe = message.senderId === authUser._id;
  const chatclassName = isMe ? "chat-end" : "chat-start";
  const profilePic = isMe
    ? authUser.ProfilePic
    : selectedConversation?.ProfilePic;
  const bubblebgcolor = isMe ? "bg-blue-500" : "";

  //for incoming message css classs shaking(socket io)
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatclassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="Tailwind css chat bubble component" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubblebgcolor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
