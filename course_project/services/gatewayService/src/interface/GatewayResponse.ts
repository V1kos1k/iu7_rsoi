export interface ISessionResponse {
  userUid: string;
  userRole: string;
}

export interface ISessionResponseDB {
  user_uid: string;
  user_role: string;
}

export interface ISessionResponseAll {
  userUid: string;
  userRole: string;
  name: string;
}

export interface ISessionResponseBody {}
