import React from "react";
import { NavLink } from "react-router-dom";

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
                <i className="far fa-file-alt"></i> <span>Role & Permission</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="nav-link" to="/role">
                    Role
                  </NavLink>
                </li>

                <li>
                  <a className="nav-link" href="forms-editor.html">
                    Permission
                  </a>
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
