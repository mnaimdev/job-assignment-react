import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AssignRole from "./components/admin/assign role/AssignRole";
import AssignRoleCreate from "./components/admin/assign role/AssignRoleCreate";
import AssignRoleEdit from "./components/admin/assign role/AssignRoleEdit";
import Dashboard from "./components/admin/layouts/Dashboard";
import Layout from "./components/admin/layouts/Layout";
import Home from "./components/admin/pages/Home";
import Login from "./components/admin/pages/Login";
import Register from "./components/admin/pages/Register";
import PermissionUnderRole from "./components/admin/permission under role/PermissionUnderRole";
import PermissionUnderRoleCreate from "./components/admin/permission under role/PermissionUnderRoleCreate";
import PermissionUnderRoleEdit from "./components/admin/permission under role/PermissionUnderRoleEdit";
import Permission from "./components/admin/permission/Permission";
import PermissionCreate from "./components/admin/permission/PermissionCreate";
import PermissionEdit from "./components/admin/permission/PermissionEdit";
import Role from "./components/admin/role/Role";
import RoleCreate from "./components/admin/role/RoleCreate";
import RoleEdit from "./components/admin/role/RoleEdit";
import Profile from "./components/admin/user/Profile";
import User from "./components/admin/user/User";
import UserCreate from "./components/admin/user/UserCreate";
import UserEdit from "./components/admin/user/UserEdit";
import PageNotFound from "./components/PageNotFound";

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
              <Permission />
            </Layout>}></Route>

            <Route path="/permission/create" element={<Layout>
              <PermissionCreate />
            </Layout>}></Route>

            <Route path="/permission/edit/:id" element={<Layout>
              <PermissionEdit />
            </Layout>}></Route>

            <Route path="/permission_under_role" element={<Layout>
              <PermissionUnderRole />
            </Layout>}></Route>

            <Route path="/permission_under_role/create" element={<Layout>
              <PermissionUnderRoleCreate />
            </Layout>}></Route>

            <Route path="/permission_under_role/edit/:id" element={<Layout>
              <PermissionUnderRoleEdit />
            </Layout>}></Route>

            <Route path="/assign_role" element={<Layout>
              <AssignRole />
            </Layout>}></Route>

            <Route path="/assign_role/create" element={<Layout>
              <AssignRoleCreate />
            </Layout>}></Route>

            <Route path="/assign_role/edit/:id" element={<Layout>
              <AssignRoleEdit />
            </Layout>}></Route>

            <Route path="/user" element={<Layout>
              <User />
            </Layout>}></Route>

            <Route path="/user/create" element={<Layout>
              <UserCreate />
            </Layout>}></Route>

            <Route path="/user/edit/:id" element={<Layout>
              <UserEdit />
            </Layout>}></Route>

            <Route path="/profile" element={<Layout>
              <Profile />
            </Layout>}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
