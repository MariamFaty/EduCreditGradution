import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import SidebarStudentStyle from "./SidebarStudent.module.css";
import { sideLogo } from "./../../assets/Icons/SideLogo";

export default function SidebarStudent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // تعريف isSidebarOpen

  return (
    <>
      <div className={SidebarStudentStyle.container}>
        {/* Sidebar */}
        <div
          className={` ${SidebarStudentStyle.sidebar}  ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          } fixed lg:static h-full lg:h-auto bg-white shadow-md lg:shadow-none transition-transform duration-300 z-50 lg:w-1/4 w-64 p-4`}
        >
          <div className={SidebarStudentStyle.logo}>{sideLogo}</div>
          <div className={SidebarStudentStyle.line}></div>
          <h3 className={SidebarStudentStyle.menuTitle}>MAIN MENU</h3>
          <ul className={SidebarStudentStyle.menu}>
            <li>
              <NavLink to="/PersonalInformation" end>
                <i className="fa-solid fa-circle-plus"></i>{" "}
                <p>Personal Information</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/PersonalInformation/EnrollOfCourses">
                <i className="fa-solid fa-circle-info"></i>
                <p>Enroll Of Courses</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/PersonalInformation/StudySchedule">
                <i className="fa-solid fa-database"></i>
                <p>Study Schedule</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/PersonalInformation/ExamSchedule">
                <i className="fa-solid fa-database"></i>
                <p>Exam Schedule</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/PersonalInformation/CourseResults">
                <i className="fa-solid fa-database"></i>
                <p>Course Results</p>
              </NavLink>
            </li>
          </ul>
          <h3 className={SidebarStudentStyle.SecondTitle}>OTHER</h3>
          <ul className={SidebarStudentStyle.menu}>
            <li>
              <NavLink to="/help-center">
                <i className="fa-solid fa-circle-question"></i>
                <p>Help Center</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/reset-password">
                <i className="fa-solid fa-right-from-bracket"></i>{" "}
                <p>Reset Password</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Login">
                <i className="fa-solid fa-lock"></i> <p>Logout</p>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* الجزء الأيمن (المحتوى اللي بيتغير) */}
        <div
          className={`${
            SidebarStudentStyle.content
          } p-6 bg-white transition-all duration-300 flex-1 ${
            isSidebarOpen ? "hidden lg:block" : "w-full"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
