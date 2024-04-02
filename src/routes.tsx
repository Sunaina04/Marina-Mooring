import React from "react"; // , { lazy, Suspense }
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Dashboard from "./Components/Dashboard/Dashboard";
import LoginMain from "./Components/Login/LoginMain";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import SignUp from "./Components/SignUp/SignUp";
import { ReactElement } from "react";
import AdminLayout from "./Components/layout/admin/AdminLayout";
import Moorings from "./Components/Moormanage/Moorings/moorings";
import Vendors from "./Components/Moormanage/Vendors/vendors";
import Moormanage from "./Components/Moormanage/moormanage";
import Moorpay from "./Components/Moorpay/moorPay";
import Technicians from "./Components/Moormanage/Technicians/technicians";
import BoatYards from "./Components/Moormanage/Boatyards/boatyards";
import Reports from "./Components/Moormanage/Reports/reports";
import AccountPayable from "./Components/Moorpay/AccountPayable/accountPayable";
import AccountRecievable from "./Components/Moorpay/AccountReceivable/accountRecievable";
import ReportsMoorpay from "./Components/Moorpay/Reports/reports";
import MoorServe from "./Components/Moorserve/moorserve";
import WorkOrders from "./Components/Moorserve/WorkOrders/workOrders";
import Estimates from "./Components/Moorserve/Estimates/estimates";
import TimeCards from "./Components/Moorserve/TimeCards/timeCards";
import Forms from "./Components/Moorserve/Forms/forms";
import ReportsMoorserve from "./Components/Moorserve/Reports/reports";
import Customer from "./Components/Moormanage/Customer/Customer";
import Permission from "./Components/Permission/permission";

interface Route {
  path: string;
  element: ReactElement; // Update the type to ReactElement
  children?: Route[]; // Define children routes
}

const routes: Route[] = [
  {
    path: "",
    element: <LoginMain />,
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
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "moormanage",
        element: <Moormanage />,
        children: [
          {
            path: "customer",
            element: <Customer />,
          },
          {
            path: "mooring", // Moved inside the children array of "moormanage"
            element: <Moorings />,
          },
          {
            path: "vendors",
            element: <Vendors />,
          },
          {
            path: "technicians",
            element: <Technicians />,
          },
          {
            path: "boatyards",
            element: <BoatYards />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
        ],
      },
      {
        path: "moorpay",
        element: <Moorpay />,
        children: [
          {
            path: "accountReceivable",
            element: <AccountRecievable />,
          },
          {
            path: "accountPayable",
            element: <AccountPayable />,
          },
          {
            path: "reports",
            element: <ReportsMoorpay />,
          },
        ],
      },
      {
        path: "moorserve",
        element: <MoorServe />,
        children: [
          {
            path: "workOrders",
            element: <WorkOrders />,
          },
          {
            path: "estimates",
            element: <Estimates />,
          },
          {
            path: "timeCards",
            element: <TimeCards />,
          },
          {
            path: "forms",
            element: <Forms />,
          },
          {
            path: "reports",
            element: <ReportsMoorserve />,
          },
        ],
      },
      {
        path: "permission",
        element: <Permission/>,
      }
    ],
  },
];

export default routes;
