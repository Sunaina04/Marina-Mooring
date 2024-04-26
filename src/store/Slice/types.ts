import { UserData } from "../../Services/Authentication/AuthTypes";

export interface INITIAl_STATE {
  token: null | string;
  userData: UserData | null;
}
