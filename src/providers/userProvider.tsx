import { RestUserType } from "@/types/user";
import { authenticatedRequest } from "./api";

export const userProvider = {
  getUsers: async () => {
    try {
      const response: any = await authenticatedRequest()?.get("/users");
      const currentUsers: RestUserType[] = response.data.users;
      return { data: currentUsers };
    } catch (error) {
      console.error("An error occurred while fetching users:", error);
      throw new Error("Failed to fetch users. Please try again later."); // Throw a new error for higher-level handling
    }
  },
};
