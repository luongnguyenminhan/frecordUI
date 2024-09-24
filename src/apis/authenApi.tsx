import axios, { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";
import { LoginFormParams, LoginResponse } from "@/types/login.types";
import exp from "constants";

export const signUp = async (formValues: SignupFormParams) => {
  try {
    const response = await axiosInstance.post("/authen/sign-up", formValues);
    return response;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
};

export const confirmEmail = async (formValues: ConfirmEmailParams) => {
  try {
    const response = await axiosInstance.post(
      "/authen/confirm-email",
      formValues,
    );
    return response;
  } catch (error) {
    console.error("Error during confirm email:", error);
    throw error;
  }
};

export const login = async (
  params: LoginFormParams,
): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "authen/auth",
      params,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const refreshToken = async (
  refreshToken: string,
): Promise<AxiosResponse<LoginResponse>> => {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "authen/refresh-token",
      { refreshToken },
    );
    return response;
  } catch (error) {
    console.error("Error during refresh token:", error);
    throw error;
  }
};
export const forgetPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post("/authen/forget-password", {
      email,
    });
    return response;
  } catch (error) {
    console.error("Error during forget password:", error);
    throw error;
  }
}
