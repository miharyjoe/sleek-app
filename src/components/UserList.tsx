import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { channelProvider } from "@/providers/channelProvider";
import { ChannelType, CreateChannelType } from "@/types/channel";
import { userProvider } from "@/providers/userProvider";
import { RestUserType, UserType } from "@/types/user";

const UserList = () => {
  const router = useRouter();
  const [users, setUsers] = useState<RestUserType[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await userProvider.getUsers();
      const fetchedUsers: RestUserType[] = response.data;
      setUsers(fetchedUsers);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (userId: number) => {
    router.push(`/messages/${userId}`);
  };

  return (
    <div className="flex flex-col space-y-1 -mx-2 h-48 overflow-y-auto">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
          onClick={() => handleUserClick(user.id)}
        >
          <div
            className={`flex items-center justify-center h-8 w-8 bg-${user.color}-200 rounded-full`}
          >
            {user.name.charAt(0)}
          </div>
          <div className="ml-2 text-sm font-semibold">{user.name}</div>
          {/* <div className="text-xs text-gray-500 ml-1">({user.type})</div> */}
          {/* {channel.unreadMessages > 0 && (
            <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
              {channel.unreadMessages}
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default UserList;
