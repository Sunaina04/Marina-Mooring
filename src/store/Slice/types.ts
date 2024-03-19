import { UserData } from "../../Services/authentication/types";

export interface INITIAl_STATE {
  token: null | string;
  userData: UserData | null;
  isLoginOpened: boolean;
  showProfileMenu: boolean;
  profileMenuOpenedTab: string | null;
  apiPayload: ApiPayload[] | null;
  isFiltered: boolean;
  isOverlayOpen:boolean
  guestToken: null | string;
}

export interface PropertyUpdate {
  isUpdate: boolean;
  name: string | null;
}

export interface ApiPayload {
  apiUrl: string;
  payload: string;
  type: string;
}
