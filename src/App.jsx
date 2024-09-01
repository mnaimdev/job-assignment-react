import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/layouts/Dashboard";
import Layout from "./components/admin/layouts/Layout";
import Home from "./components/admin/pages/Home";
import Login from "./components/admin/pages/Login";
import Register from "./components/admin/pages/Register";
import PermissionCreate from "./components/admin/permission/PermissionCreate";
import PermissionEdit from "./components/admin/permission/PermissionEdit";
import Role from "./components/admin/role/Role";
import RoleCreate from "./components/admin/role/RoleCreate";
import RoleEdit from "./components/admin/role/RoleEdit";

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

            <Route path="/role" element={<Layout>
              <Role />
            </Layout>}></Route>

            <Route path="/role/create" element={<Layout>
              <RoleCreate />
            </Layout>}></Route>

            <Route path="/role/edit/:id" element={<Layout>
              <RoleEdit />
            </Layout>}></Route>

            <Route path="/permission" element={<Layout>
              <Role />
            </Layout>}></Route>

            <Route path="/permission/create" element={<Layout>
              <PermissionCreate />
            </Layout>}></Route>

            <Route path="/permission/edit/:id" element={<Layout>
              <PermissionEdit />
            </Layout>}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
