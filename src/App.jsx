import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/layouts/Dashboard";
import Layout from "./components/admin/layouts/Layout";
import Home from "./components/admin/pages/Home";
import Login from "./components/admin/pages/Login";
import Register from "./components/admin/pages/Register";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
                <Home />
            }
          ></Route>

            <Route path="/dashboard" element={<Layout>
              <Dashboard />
            </Layout>}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
