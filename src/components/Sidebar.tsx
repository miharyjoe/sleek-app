import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from "../../public/avatar-homme.png";
import { getCookie } from "@/utils/cookie";
import Link from "next/link";
const Sidebar = ({ cookie }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(cookie);
  }, []);
  return (
    <>
      <Link href="/message">
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
              width={"50"}
              height={"50"}
              unoptimized={true}
            />
          </div>
          <div className="text-sm font-semibold mt-2">{user?.name}</div>
          <div className="text-xs text-gray-500">{user?.bio}</div>
          <div className="flex flex-row items-center mt-3">
            <div className="flex flex-col justify-center h-4 w-8 bg-teal-500 rounded-full">
              <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
            </div>
            <div className="leading-none ml-1 text-xs">
              {(() => {
                if (user?.status === 0) return "Away";
                else if (user?.status === 1) return "Connected";
                else if (user?.status === 2) return "Do not disturb";
                return null; // Return null if the status doesn't match any condition
              })()}
            </div>
          </div>
        </div>
      </Link>

      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            4
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
          <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
              H
            </div>
            <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
          </button>
          <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
              M
            </div>
            <div className="ml-2 text-sm font-semibold">Marta Curtis</div>
            <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
              2
            </div>
          </button>
          <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full">
              P
            </div>
            <div className="ml-2 text-sm font-semibold">Philip Tucker</div>
          </button>
          <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full">
              C
            </div>
            <div className="ml-2 text-sm font-semibold">Christine Reid</div>
          </button>
          <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-purple-200 rounded-full">
              J
            </div>
            <div className="ml-2 text-sm font-semibold">Jerry Guzman</div>
          </button>
        </div>
        <div className="flex flex-row items-center justify-between text-xs mt-6">
          <span className="font-bold">Archivied</span>
          <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            7
          </span>
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2">
          <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
              H
            </div>
            <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
