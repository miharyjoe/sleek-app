import {
  CreateUserType,
  LoginUserType,
  RestUser,
  UserType,
} from "@/types/user";
import { authenticatedRequest, unauthenticatedRequest } from "./api";
import { setCookie } from "@/utils/cookie";

export const authProvider = {
  signIn: async (user: LoginUserType) => {
    try {
      const currentUser: RestUser = (
        await unauthenticatedRequest().post("/users/login", user)
      ).data.user;

      // Store the logged-in user's information in the cookie
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

      setCookie("userInfo", JSON.stringify(currentUser));

      return { data: currentUser, authenticate: true };
    } catch (error) {
      const {
        response: { data },
      } = error as any;

      return { data, authenticate: false };
    }
  },
};
