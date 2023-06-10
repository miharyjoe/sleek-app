import { RestUserType } from "./user";

export interface IMessage {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  recipientId: string | null;
  channelId: string;
  sender: RestUserType;
}

export interface ICreateMessage {
  content: string;
  channelId?: string;
  recipientId?: string | null;
}
