export interface LoginFormParams {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string
  accessToken: string
  refreshToken: string
}