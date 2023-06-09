import { CreateUserType, LoginUserType, UserType } from "@/types/user";
import { unauthenticatedRequest } from "./api";
import { setCookie } from "@/utils/cookie";

export const authProvider = {
  signIn: async (user: LoginUserType) => {
    try {
      const currentUser: UserType = (
        await unauthenticatedRequest().post("/users/login", user)
      ).data.user;

      // store the logged-in user's information in the cookie
      setCookie("userInfo", JSON.stringify(currentUser));

      return { data: currentUser, authenticate: true };
    } catch (error) {
      const {
        response: { data },
      } = error as any;

      return { data, authenticate: false };
    }
  },
  signUp: async (user: CreateUserType) => {
    try {
      const currentUser: UserType = (
        await unauthenticatedRequest().post("/users", user)
      ).data.user;

      return { data: currentUser, authenticate: true };
    } catch (error) {
      const {
        response: { data },
      } = error as any;

      return { data, authenticate: false };
    }
  },
};
