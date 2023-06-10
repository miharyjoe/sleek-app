import { RestUser, RestUserType, UserType } from "@/types/user";
import { authenticatedRequest } from "./api";
import { getCookie, setCookie } from "@/utils/cookie";

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
  updateUser: async (updateUser: RestUser) => {
    try {
      const response = await authenticatedRequest()?.put("/user", updateUser);

      //   const res = await authenticatedRequest()?.get("/user");
      const currentUser = response?.data.user;
      console.log(currentUser);

      // Retrieve the existing userInfo cookie
      const userInfo = JSON.parse(getCookie("userInfo"));

      // Update the user information in the userInfo object
      const updatedUserInfo = { ...userInfo, ...currentUser };

      // Update the userInfo cookie with the updated data
      setCookie("userInfo", JSON.stringify(updatedUserInfo));
      return { data: currentUser };
    } catch (error) {
      console.error("An error occurred while updating users:", error);
      throw new Error("Failed to fetch updating. Please try again later."); // Throw a new error for higher-level handling
    }
  },
  sendMessage: async (content: any) => {
    try {
      const response = await authenticatedRequest()?.post("/message/", content);
    } catch (error) {
      console.error("An error occurred while sending message", error);
      throw new Error("Failed sending message");
    }
  },
};
