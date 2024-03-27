import React from "react"; // , { lazy, Suspense }
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Dashboard from "./Components/Dashboard/Dashboard";
import LoginMain from "./Components/Login/LoginMain";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Pages/Home";
import { ReactElement } from "react";
import AdminLayout from "./Components/layout/admin/AdminLayout";
import Header from "./Components/layout/admin/components/Header";
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
import Customer from "./Components/EmployeeManagement/Customer";
import CustomModal from "./Components/customComponent/CustomModal";

interface Route {
  path: string;
  element: ReactElement; // Update the type to ReactElement
  children?: Route[]; // Define children routes
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
      },
      // children: [
      {
        path: "moormanage/customer",
        element: <Moormanage />,
      },
      {
        path: "moormanage/mooring",
        element: <Moorings />,
      },
      {
        path: "moormanage/vendors",
        element: <Vendors />,
      },
      {
        path: "moormanage/technicians",
        element: <Technicians />,
      },
      {
        path: "moormanage/boatyards",
        element: <BoatYards />,
      },
      {
        path: "moormanage/reports",
        element: <Reports />,
      },
      // ],
      // },
      {
        path: "moorpay",
        element: <Moorpay />,
      },
      // children: [
      {
        path: "moorpay/accountReceivable",
        element: <AccountRecievable />,
      },
      {
        path: "moorpay/accountPayable",
        element: <AccountPayable />,
      },
      {
        path: "moorpay/reports",
        element: <ReportsMoorpay />,
      },
      // ],
      // },
      {
        path: "moorserve",
        element: <MoorServe />,
      },
      // children: [
      {
        path: "moorserve/workOrders",
        element: <WorkOrders />,
      },
      {
        path: "moorserve/estimates",
        element: <Estimates />,
      },
      {
        path: "moorserve/timeCards",
        element: <TimeCards />,
      },
      {
        path: "moorserve/forms",
        element: <Forms />,
      },
      {
        path: "reports",
        element: <ReportsMoorserve />,
      },
      //   ],
      // },
    ],
  },
];

export default routes;