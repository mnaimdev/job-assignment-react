import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [permissions, setPermissions] = useState([]);

  const hasPermission = (permissionToCheck) => {
    return permissions.includes(permissionToCheck);
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get("/permission/user");
        setPermissions(response.data.data || []);
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      }
    };

    fetchPermissions();
  }, []);

  return (
    <div className="main-sidebar sidebar-style-2">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <a href="/">RBAC</a>
        </div>
        <div className="sidebar-brand sidebar-brand-sm">
          <a href="/">RB</a>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-header">Dashboard</li>
          <li className="dropdown active">
            <a href="#" className="nav-link has-dropdown">
              <i className="fas fa-fire"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="menu-header">RBAC</li>
          <li className="dropdown">
            <a href="#" className="nav-link has-dropdown">
              <i className="fa fa-users"></i> <span>Role & Permission</span>
            </a>
            <ul className="dropdown-menu">
              {hasPermission("role") && (
                <li>
                  <Link className="nav-link" to="/role">
                    Role
                  </Link>
                </li>
              )}

              {hasPermission("permission") && (
                <li>
                  <Link className="nav-link" to="/permission">
                    Permission
                  </Link>
                </li>
              )}

              {hasPermission("permission_under_role") && (
                <li>
                  <Link className="nav-link" to="/permission_under_role">
                    Permission Under Role
                  </Link>
                </li>
              )}

              {hasPermission("assign_role") && (
                <li>
                  <Link className="nav-link" to="/assign_role">
                    Assign Role
                  </Link>
                </li>
              )}
            </ul>
          </li>

          
          {/* User Management Section */}{" "}
          <li className="dropdown">
            <a
              className="nav-link has-dropdown"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fa fa-user"></i> <span>User Management</span>
            </a>
            <ul className="dropdown-menu">
              {hasPermission("user") && (
                <li>
                  <Link className="nav-link" to="/user">
                    User
                  </Link>
                </li>
              )}
              {hasPermission("profile_info") && (
                <li>
                  <Link className="nav-link" to="/profile">
                    Profile Info
                  </Link>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
