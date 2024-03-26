import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Pages/Home";
import Header from "./Components/layout/admin/components/Header";
import Footer from "./Components/layout/admin/components/Footer";
import SignUp from "./Components/SignUp/SignUp";
import { Provider } from "react-redux";
import { store } from "./store/store";
import EmployeeManagement from "./Components/EmployeeManagement/EmployeeManagement";
import AdminLayout from "./Components/layout/admin/AdminLayout";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <AdminLayout/>
        <Routes>
          <Route path="/" element={<EmployeeManagement />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employee" element={<EmployeeManagement/>} />
          <Route path="/admin/*" element={<AdminLayout />}> {/* Use wildcard for nested routes */}
            <Route path="dashboard" element={<Dashboard />} /> {/* Render Dashboard inside AdminLayout */}
          </Route>
        </Routes>
        {/* <Footer /> */}
      </Router>
    </Provider>
  );
}

export default App;
