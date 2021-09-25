export type UserRole = "user" | "admin";

export interface ISessionRequest {
  name: string;
  password: string;
  userRole: UserRole;
}

export interface ISessionRequestParamter {}

export interface ISessionRequestBody {
  name: string;
  userUid: string;
  password: string;
  userRole: UserRole;
}
