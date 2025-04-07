import { Axiosinstance, AxiosInstanceServer } from "@/api/instance";
import Cookies from "js-cookie";

export type TokenType = {
  token: string;
  user_id: string;
  user_email: string;
};

const COOKIE_NAME = "mimipoint_token";

// Get token from cookies
export const Auth = {
  getToken: (): string | null => {
    const tokenData = Cookies.get(COOKIE_NAME);
    if (!tokenData) return null;

    try {
      const parsed = JSON.parse(tokenData) as TokenType;
      return parsed.token;
    } catch (error) {
      console.error("Invalid token cookie:", error);
      return null;
    }
  },
};

// Save token to cookies
export const saveToken = (data: TokenType) => {
  const { token, user_id, user_email } = data;
  const tokenData = {
    token,
    user_id,
    user_email,
  };

  Cookies.set(COOKIE_NAME, JSON.stringify(tokenData), {
    expires: 365, // 1 year
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
};

// Remove token from cookies
export const removeToken = () => {
  Cookies.remove(COOKIE_NAME);
};


// get user from the database by email
export const getUserByEmail = async (email: string) => {
  const response = await AxiosInstanceServer.get(
    `users/user_by_email/${email}`
  );
  return response.data;
};

export const getTokenByEmail = async (email: string) => {
  const response = await Axiosinstance.get(`users/token/${email}`);
  return response.data;
};
