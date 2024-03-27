import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Dashboard from "./Components/Dashboard/Dashboard";
import LoginForm from "./Components/Login/LoginForm";
import LoginMain from "./Components/Login/LoginMain";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Pages/Home";
import { ReactElement } from "react";
import Customer from "./Components/EmployeeManagement/Customer";
import CustomModal from "./Components/customComponent/CustomModal";

interface Route {
  path: string;
  element: ReactElement; // Update the type to ReactElement
}

const routes: Route[] = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "login",
    element: <LoginMain />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "resetPass",
    element: <ResetPassword />,
  },

  {
    path: "forgotPass",
    element: <ForgotPassword />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "customer",
    element: <Customer />,
  },
  

];

export default routes;


