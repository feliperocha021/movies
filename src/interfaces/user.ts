export interface IUser {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin" | "superadmin";
}

/* Request */
export interface UpdateRequest {
  username: string;
  email: string;
}

/* Response */
export interface UserResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
  };
}

export interface UsersResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser[];
  };
}