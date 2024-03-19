// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add more routes here as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
