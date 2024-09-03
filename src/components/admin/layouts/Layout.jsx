import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer.jsx";
import Header from "../layouts/Header.jsx";
import Sidebar from "../layouts/Sidebar.jsx";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token == '') {
      navigate("/");
    }
  }, [navigate]);


  return (
    <div id="app">
      <div className="main-wrapper main-wrapper-1">
        <div className="navbar-bg"></div>

        <Header />
        <Sidebar />
        <div className="main-content">{children}</div>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
