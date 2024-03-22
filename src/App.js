// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Pages/Home";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";
import SignUp from "./Components/SignUp/SignUp";
import { Provider } from "react-redux";
import { store } from "./store/store";
import EmployeeManagement from "./Components/EmployeeManagement/EmployeeManagement";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeManagement />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/employee" element={<EmployeeManagement/>} />
          {/* Add more routes here as needed */}
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
