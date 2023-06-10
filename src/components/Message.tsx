import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { userProvider } from "@/providers/userProvider";

const Message = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: messages } = useSWR(`/messages/${userId}`);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    try {
      await userProvider.sendMessage(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {messages?.map((message) => (
                <div
                  key={message.id}
                  className={`col-start-${
                    message.senderId === userId ? "6" : "1"
                  } col-end-${
                    message.senderId === userId ? "13" : "8"
                  } p-3 rounded-lg`}
                >
                  <div className="flex flex-row items-center">
                    <div
                      className={`flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0`}
                    >
                      {message.senderName.charAt(0)}
                    </div>
                    <div
                      className={`relative ml-3 text-sm bg-${
                        message.senderId === userId ? "indigo" : "white"
                      } py-2 px-4 shadow rounded-xl`}
                    >
                      <div>{message.text}</div>
                      {message.senderId !== userId && (
                        <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                          {message.seen ? "Seen" : "Delivered"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <input
                type="text"
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                onClick={handleSendMessage}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.
                    4 0 01-4.586-2.586L3 10l7-7 7 7-1.414 1.414A4 4 0 0114.828 14.828zM17 10h2m0 0v2m0-2h-2m0-2v-2m0 2H7m0 0v-2m0 2h2m0 2v2m0-2h6a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h6z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
