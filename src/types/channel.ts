import { RestUserType } from "./user";

export interface ChannelType {
  id: string;
  name: string;
  type: "public" | "private";
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  owner: RestUserType;
}

export interface CreateChannelType {
  name: string;
  type: "public" | "private";
  members: RestUserType[];
}
