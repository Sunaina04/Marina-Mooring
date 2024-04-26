import { UserData } from "../../Services/authentication/types";

export interface INITIAl_STATE {
  token: null | string;
  userData: UserData | null;
}
