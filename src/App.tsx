import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/layout/admin/components/Header";
import Footer from "./Components/layout/admin/components/Footer";
import SignUp from "./Components/SignUp/SignUp";
import { Provider } from "react-redux";
import { store } from "./store/store";
import EmployeeManagement from "./Components/EmployeeManagement/EmployeeManagement";
import AdminLayout from "./Components/layout/admin/AdminLayout";
import Dashboard from "./Components/Dashboard/Dashboard";
import LoginMain from "./Components/Login/LoginMain";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        {/* <AdminLayout/> */}
        <Routes>
          <Route path="/" element={<EmployeeManagement />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetPass" element={<ResetPassword />} />
          <Route path="/forgotPass" element={<ForgotPassword />} />
          <Route path="/employee" element={<EmployeeManagement />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </Provider>
  );
}

export default App;
