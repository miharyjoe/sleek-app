import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from "../../public/avatar-homme.png";
import { getCookie } from "@/utils/cookie";
import Link from "next/link";
import LogoutButton from "./LogOut";
import ChannelList from "./channelList";
import UserList from "./UserList";
const Sidebar = ({ cookie }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(cookie);
  }, []);
  return (
    <>
      <Link href="/messages">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-teal-600 bg-indigo-100 h-10 w-10">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">Sleek</div>
        </div>
      </Link>
      <Link href="/profile">
        <div className="flex flex-col items-center bg-teal-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <Image
              src={avatar}
              alt="Avatar"
              className="h-full w-full"
              width={50}
              height={50}
            />
          </div>
          <div className="text-sm font-semibold mt-2">{user?.name}</div>
          <div className="text-xs text-gray-500">{user?.bio}</div>
        </div>
      </Link>

      <div className="flex flex-col mt-8">
        <Link
          href="/channel/create"
          className="hover:bg-teal-100 rounded-xl p-2"
        >
          <div className="flex flex-row items-center justify-between text-xl">
            <span className="font-bold">Create Channel</span>
            <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full text-xl">
              +
            </span>
          </div>
        </Link>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-49 overflow-y-auto">
          <div>Users list</div>
          <UserList />
          <div>Channels list</div>
          <ChannelList />
        </div>
        <LogoutButton />
      </div>
    </>
  );
};

export default Sidebar;
