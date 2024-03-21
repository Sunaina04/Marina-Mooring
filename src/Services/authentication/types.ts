
export interface LOGIN_PAYLOAD {
  username: string;
  password: string;
}

export interface SIGNUP_PAYLOAD {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface RESET_PASSWORD_PAYLOAD {
  email: string;
  new_password: string;
  confirm_password: string;
}

export interface FORGOT_PASSWORD_PAYLOAD {
  email: string;
}

export interface UserData {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  creationDate: string;
  lastModifiedDate: string;
  phoneNumber: string;
}

export interface RoleData {
  id: string;
  creationDate: string;
  lastModifiedDate: string;
  name: string;
  description: string;
}

export interface LOGIN_RESPONSE {
  status: number;
  message: string;
  user: UserData;
  token: string;
  role: RoleData;
}

export interface SIGNUP_RESPONSE {
  data: {
    status: number;
    message: string;
    data: UserData;
  };
}

export interface RESET_PASSSWORD_RESPONSE {
  status: number;
  message: string;
  data: {
    status: number;
    message: string;
  };
}

export interface FORGOT_PASSSWORD_RESPONSE {
  status: number;
  message: string;
  data: any;
}

export interface AuthenticationData {
  token: string;
  data: UserData;
}

export interface ErrorResponse {
  status: number;
  message: string;
}
