import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContextProvider from "./Context/AuthContextProvider";
import Select from "./Pages/SelectType/Select";
import Login from "./Pages/Auth/Login/Login";
import PersonalInformation from "./Pages/PersonalInformation/PersonalInformation";
import SidebarSuperAdmin from "./Layout/SidebarSuperAdmin/SidebarSuperAdmin";
import DashboardSuperAdmin from "./Pages/SuperAdminInformation/DashboardSuperAdmin/DashboardSuperAdmin";
import ManageStudents from "./Pages/SuperAdminInformation/ManageStudents/ManageStudents";
import ManageAdmins from "./Pages/SuperAdminInformation/ManageAdmins/ManageAdmins";
import ManageCourses from "./Pages/SuperAdminInformation/ManageCourses/ManageCourses";
import ManageDepartments from "./Pages/SuperAdminInformation/ManageDepartments/ManageDepartments";
import ManageTeachers from "./Pages/SuperAdminInformation/ManageTeachers/ManageTeachers";
import SidebarStudent from "./Layout/SidebarStudent/SidebarStudent";
import EnrollOfCourses from "./Pages/StudentInformation/EnrollOfCourses/EnrollOfCourses";
import StudySchedule from "./Pages/StudentInformation/StudySchedule/StudySchedule";
import ExamSchedule from "./Pages/StudentInformation/ExamSchedule/ExamSchedule";
import CourseResults from "./Pages/StudentInformation/CourseResults/CourseResults";
import AddDepartment from "./Pages/SuperAdminInformation/ManageDepartments/AddDepartment/AddDepartment";
import AddCourse from "./Pages/SuperAdminInformation/ManageCourses/AddCourse/AddCourse";
import AddStudent from "./Pages/SuperAdminInformation/ManageStudents/AddStudent/AddStudent";
import AddTeacher from "./Pages/SuperAdminInformation/ManageTeachers/AddTeacher/AddTeacher";
import AddAdmin from "./Pages/SuperAdminInformation/ManageAdmins/AddAdmin/AddAdmin";
import ManageSemesters from "./Pages/SuperAdminInformation/ManageSemesters/ManageSemesters";
import EditDepartment from "./Pages/SuperAdminInformation/ManageDepartments/EditDepartment/EditDepartment";
import InfoCourse from "./Pages/SuperAdminInformation/ManageCourses/InfoCourse/InfoCourse";
import InfoTeacher from "./Pages/SuperAdminInformation/ManageTeachers/InfoTeacher/InfoTeacher";
import InfoAdmin from "./Pages/SuperAdminInformation/ManageAdmins/InfoAdmin/InfoAdmin";
import InfoStudent from "./Pages/SuperAdminInformation/ManageStudents/InfoStudent/InfoStudent";
import EditCourse from "./Pages/SuperAdminInformation/ManageCourses/EditCourse/EditCourse";
import AddSemester from "./Pages/SuperAdminInformation/ManageSemesters/AddSemester/AddSemester";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Select />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/SuperAdminRole",
    element: <SidebarSuperAdmin />, // جعل الـ Sidebar هو الأب
    children: [
      {
        path: "", // المسار الفارغ يعني الصفحة الرئيسية داخل هذا القسم
        element: <DashboardSuperAdmin />,
      },
      {
        path: "PersonalInformation",
        element: <PersonalInformation />,
      },
      {
        path: "ManageStudents",
        element: <ManageStudents />,
      },
      {
        path: "ManageSemesters",
        element: <ManageSemesters />,
      },
      {
        path: "ManageSemesters/AddSemester",
        element: <AddSemester />,
      },
      {
        path: "ManageAdmins",
        element: <ManageAdmins />,
      },
      {
        path: "ManageCourses",
        element: <ManageCourses />,
      },
      {
        path: "ManageDepartments",
        element: <ManageDepartments />,
      },
      {
        path: "ManageTeachers",
        element: <ManageTeachers />,
      },
      {
        path: "ManageDepartments/AddDepartment",
        element: <AddDepartment />,
      },
      {
        path: "ManageCourses/AddCourse",
        element: <AddCourse />,
      },
      {
        path: "AddStudent",
        element: <AddStudent />,
      },
      {
        path: "AddTeacher",
        element: <AddTeacher />,
      },
      {
        path: "AddAdmin",
        element: <AddAdmin />,
      },
      {
        path: "ManageDepartments/EditDepartment/:departmentId",
        element: <EditDepartment />,
      },
      {
        path: "ManageCourses/EditCourse/:courseId",
        element: <EditCourse />,
      },
      {
        path: "ManageCourses/InfoCourse/:courseId",
        element: <InfoCourse />,
      },
      {
        path: "ManageTeachers/InfoTeacher/:teacherId", // إضافة المعرف :teacherId في المسار
        element: <InfoTeacher />,
      },
      {
        path: "ManageAdmins/InfoAdmin/:adminId", // إضافة المعرف :teacherId في المسار
        element: <InfoAdmin />,
      },
      {
        path: "ManageStudents/InfoStudent/:studentId", // إضافة المعرف :teacherId في المسار
        element: <InfoStudent />,
      },
    ],
  },
  {
    path: "/StudentRole",
    element: <SidebarStudent />,
    children: [
      {
        path: "",
        element: <PersonalInformation />,
      },
      {
        path: "EnrollOfCourses",
        element: <EnrollOfCourses />,
      },
      {
        path: "StudySchedule",
        element: <StudySchedule />,
      },
      {
        path: "ExamSchedule",
        element: <ExamSchedule />,
      },
      {
        path: "CourseResults",
        element: <CourseResults />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
