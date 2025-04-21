import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import SidebarSuperAdminStyle from "./SidebarSuperAdmin.module.css";
import { sideLogo } from "./../../assets/Icons/SideLogo";

export default function SidebarSuperAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close Sidebar when an item is clicked (on small screens)
  const handleNavClick = () => {
    if (window.innerWidth > 1440) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };
  return (
    <>
      {/* Hamburger Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#0077B6] text-white rounded-md focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={
              isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>
      <div className={SidebarSuperAdminStyle.container}>
        {/* Sidebar */}
        <div
          className={` ${SidebarSuperAdminStyle.sidebar}  ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          } fixed lg:static h-full lg:h-auto bg-white shadow-md lg:shadow-none transition-transform duration-300 z-50 lg:w-1/4 w-64 p-4`}
        >
          <div className={SidebarSuperAdminStyle.logo}>{sideLogo}</div>
          <div className={SidebarSuperAdminStyle.line}></div>
          <h3 className={SidebarSuperAdminStyle.menuTitle}>MAIN MENU</h3>
          <ul className={SidebarSuperAdminStyle.menu}>
            <li>
              <NavLink to="/SuperAdminRole">
                <i class="fa-solid fa-chart-pie"></i> <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/SuperAdminRole/PersonalInformation"
                className={({ isActive }) =>
                  `${isActive ? "bg-[#E6E6E6]" : "text-gray-600"}`
                }
              >
                <i className="fa-solid fa-circle-info"></i>
                <p>Personal Information</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/SuperAdminRole/ManageDepartments"
                className={({ isActive }) =>
                  `${isActive ? "bg-[#E6E6E6]" : "text-gray-600"}`
                }
              >
                <i className="fa-solid fa-database"></i>
                <p>Manage Departments</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/SuperAdminRole/ManageCourses"
                className={({ isActive }) =>
                  `${isActive ? "bg-[#E6E6E6]" : "text-gray-600"}`
                }
              >
                <i className="fa-solid fa-database"></i> <p>Manage Courses</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/SuperAdminRole/ManageStudents"
                className={({ isActive }) =>
                  `${isActive ? "bg-[#E6E6E6]" : "text-gray-600"}`
                }
              >
                <i className="fa-solid fa-database"></i>
                <p>Manage Students</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/SuperAdminRole/ManageTeachers"
                className={({ isActive }) =>
                  `${isActive ? "bg-[#E6E6E6]" : "text-gray-600"}`
                }
              >
                <i className="fa-solid fa-database"></i>
                <p>Manage Teachers</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/SuperAdminRole/ManageAdmins"
                className={({ isActive }) =>
                  `${isActive ? "bg-[#E6E6E6]" : "text-gray-600"}`
                }
              >
                <i className="fa-solid fa-database"></i>
                <p>Manage Admins</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/SuperAdminRole/ManageSemesters"
                className={({ isActive }) =>
                  `${isActive ? "bg-[#E6E6E6]" : "text-gray-600"}`
                }
              >
                <i className="fa-solid fa-database"></i>
                <p>Manage Semesters</p>
              </NavLink>
            </li>
          </ul>
          <h3 className={SidebarSuperAdminStyle.SecondTitle}>OTHER</h3>
          <ul className={SidebarSuperAdminStyle.menu}>
            <li>
              <NavLink
                to="/SuperAdminRole/reset-password"
                className={({ isActive }) =>
                  `${isActive ? "bg-[#E6E6E6]" : "text-gray-600"}`
                }
              >
                <i className="fa-solid fa-right-from-bracket"></i>{" "}
                <p>Reset Password</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Login"
                className={({ isActive }) =>
                  `${isActive ? "bg-[#E6E6E6]" : "text-gray-600"}`
                }
              >
                <i className="fa-solid fa-lock"></i> <p>Logout</p>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* الجزء الأيمن (المحتوى اللي بيتغير) */}
        <div
          className={`${
            SidebarSuperAdminStyle.content
          }  bg-white transition-all duration-300 flex-1 ${
            isSidebarOpen ? "hidden lg:block" : "w-full"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
