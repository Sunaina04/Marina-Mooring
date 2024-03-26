import Dashboard from "./Components/Dashboard/Dashboard";
import LoginForm from "./Components/Login/LoginForm";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Pages/Home";
import { ReactElement } from "react";

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
    element: <LoginForm />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  }
];

export default routes;
