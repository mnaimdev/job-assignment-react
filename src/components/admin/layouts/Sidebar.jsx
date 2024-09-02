import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <a to="">RBAC</a>
          </div>
          <div className="sidebar-brand sidebar-brand-sm">
          <a to="">RB</a>
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
                <li>
                  <Link className="nav-link" to="/role">
                    Role
                  </Link>
                </li>

                <li>
                  <Link className="nav-link" to="/permission">
                    Permission
                  </Link>
                </li>

                <li>
                  <Link className="nav-link" to="/permission_under_role">
                    Permission Under Role
                  </Link>
                </li>

                <li>
                  <Link className="nav-link" to="/assign_role">
                    Assign Role
                  </Link>
                </li>
                
              </ul>
            </li>

            <li className="dropdown">
              <a href="#" className="nav-link has-dropdown">
                <i className="fa fa-user"></i> <span>User Management</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="nav-link" to="/user">
                    User
                  </Link>
                </li>

                <li>
                  <Link className="nav-link" to="/auth/user">
                    Profile Info
                  </Link>
                </li>
              </ul>
            </li>
            
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
