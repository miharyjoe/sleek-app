import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { channelProvider } from "@/providers/channelProvider";
import { ChannelType, CreateChannelType } from "@/types/channel";

const ChannelList = () => {
  const router = useRouter();
  const [channels, setChannels] = useState<ChannelType[]>([]);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      const response = await channelProvider.getChannels();
      const fetchedChannels: ChannelType[] = response.data;
      setChannels(fetchedChannels);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChannelClick = (channelId: number) => {
    router.push(`/channel/${channelId}`);
  };

  const handleEditChannel = (channelId: number) => {
    router.push(`/channel/${channelId}`);
  };

  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
        >
          <div
            className={`flex items-center justify-center h-8 w-8 bg-${channel.color}-200 rounded-full`}
          >
            {channel.name.charAt(0)}
          </div>
          <div className="ml-2 text-sm font-semibold">{channel.name}</div>
          <div className="text-xs text-gray-500 ml-1">({channel.type})</div>
          {/* {channel.unreadMessages > 0 && (
            <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
              {channel.unreadMessages}
            </div>
          )} */}
          <button
            className="ml-auto text-xs text-blue-500"
            onClick={() => handleEditChannel(channel.id)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;
