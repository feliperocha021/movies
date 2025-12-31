import type { IUser } from "./user";

/* Request */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string,
  email: string,
  password: string
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/* Response */
export interface LogoutResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    accessToken: string;
  };
}
