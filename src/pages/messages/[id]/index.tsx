import Sidebar from "@/components/Sidebar";

import { getCookie } from "@/utils/cookie";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { messageProvider } from "@/providers/messageProvider";
import { useForm } from "react-hook-form";
import { ICreateMessage, IMessage } from "@/types/message";

const Message = () => {
  const cookieString = getCookie("userInfo");

  let cookie: any = null;
  try {
    if (cookieString) {
      cookie = JSON.parse(cookieString);
    }
  } catch (error) {
    console.error("Error parsing userInfo cookie:", error);
  }
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[] | undefined>();
  const router = useRouter();
  const { user_id } = router.query;

  const validationSchema = Yup.object().shape({
    recipientId: Yup.string().default(user_id?.toString()),
    content: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateMessage>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    messageProvider
      .getMessagesByUser(user_id?.toString())
      .then((messages) => {
        setMessages(messages.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const onSubmit = async (newMessage: ICreateMessage) => {
    await messageProvider.sendMessage(newMessage);
  };
  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <Sidebar cookie={cookie} />
          </div>
          {/* message content */}
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>Hey How are you today?</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Vel ipsa commodi illum saepe numquam maxime
                            asperiores voluptate sit, minima perspiciatis.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* message input */}
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                {/* Input and send button */}
                <form onSubmit={onSubmit} className="w-full">
                  <textarea
                    className="w-full h-full py-2 px-3 border border-gray-300 rounded-lg resize-none focus:outline-none"
                    placeholder="Type your message..."
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                  <button
                    type="submit"
                    className="flex-shrink-0 ml-4 bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
