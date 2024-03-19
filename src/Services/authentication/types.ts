
export interface LOGIN_PAYLOAD {
  username: string;
  password: string;
  email: string;
  device_type: string;
  device_token: string;
  user_type: string;
  guestToken: string | null;
}

export interface SIGNUP_PAYLOAD {
  email: string;
  name: string;
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
  credits: number;
  commision_rate: string;
  rating: string;
  agentDescription: string;
  agent_license: string;
  realEstateAgent: boolean;
  buyerLeads: boolean;
  listing: boolean;
  _id: string;
  user_login: string;
  user_pass: string;
  user_nicename: string;
  user_name: string;
  user_email: string;
  user_url: string;
  user_registered: Date | null;
  user_activation_key: string;
  user_status: number;
  display_name: string;
  user_mobile: string;
  country_code: string;
  user_otp: string;
  otp_status: string;
  user_address: string;
  user_deviceType: string;
  user_deviceToken: string;
  social_id: string;
  social_token: string;
  user_Type: string;
  agent_ID: string;
  agent_title: string;
  first_name: string;
  last_name: string;
  agent_position: string;
  agent_phone: string;
  agent_mobile: string;
  agent_skype: string;
  agent_facebook: string;
  agent_twitter: string;
  agent_linkedin: string;
  agent_pinterest: string;
  agent_instagram: string;
  agent_whatsapp: string;
  threads: string;
  device_Type: string;
  created_at: string;
  updated_at: string;
  __v: number;
  stateCity: string;
  streetAddress: string;
  zipCode: string;
  token?: string;
  guestToken?: string;
  oldPassword?: string;
  newPassword?: string;
  fcmToken?: string;
}

export interface LOGIN_RESPONSE {
  status: number;
  message: string;
  data: {
    user: UserData;
    token: string;
  };
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
