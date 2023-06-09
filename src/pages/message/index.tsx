import Sidebar from "@/components/Sidebar";
import { getCookie } from "@/utils/cookie";
import React from "react";

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

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <Sidebar cookie={cookie} />
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            {/* <Message /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
