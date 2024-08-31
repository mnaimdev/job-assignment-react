import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div id="app">
          <div className="main-wrapper main-wrapper-1">
            <div className="navbar-bg"></div>

            <Header />
            <Sidebar />

            <div className="main-content">
              {children}
            </div>

            <Footer />
          </div>
        </div>
    </>
  );
};

export default Layout;
