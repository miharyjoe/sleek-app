import { ChannelType, CreateChannelType } from "@/types/channel";
import { authenticatedRequest } from "./api";

export const channelProvider = {
  createChannel: async (newChannel: CreateChannelType) => {
    try {
      const createdChannel: ChannelType = (
        await authenticatedRequest()?.post("/channel", newChannel)
      )?.data.channel;
      return { data: createdChannel, check: true };
    } catch (error) {
      return { data: null as any, check: false };
    }
  },
  getChannels: async () => {
    try {
      const response = await authenticatedRequest()?.get("/channels");
      const currentChannels: ChannelType[] = response?.data.channels;
      return { data: currentChannels };
    } catch (error) {
      console.error("An error occurred while fetching channels:", error);
      throw new Error("Failed to fetch channels. Please try again later.");
    }
  },
  getChannel: async (id: number) => {
    try {
      const response = await authenticatedRequest()?.get(`/channel/${id}`);
      const currentChannels: ChannelType = response?.data.channels;
      return { data: currentChannels };
    } catch (error) {
      console.error("An error occurred while fetching channel:", error);
      throw new Error("Failed to fetch channels. Please try again later.");
    }
  },
  addMembers: async (id: number, members: number[]) => {
    try {
      const response = await authenticatedRequest()?.post(
        `/channel/${id}/members`,
        { members }
      );
      const currentChannels: ChannelType = response?.data.channels;
      return { data: currentChannels };
    } catch (error) {
      console.error("An error occurred while adding members:", error);
      throw new Error("Failed to add members. Please try again later.");
    }
  },
};
