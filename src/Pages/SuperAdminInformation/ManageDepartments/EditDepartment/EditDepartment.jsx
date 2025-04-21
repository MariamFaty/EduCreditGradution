import React, { useContext, useState, useEffect } from "react";
import Inputs from "../../../../Shared/Css/InputsDesign.module.css";
import AddText from "../../../../Shared/Css/AddTextDesign.module.css";
import ButtonDesign from "../../../../Shared/Css/ButtonDesign.module.css";
import { authContext } from "./../../../../Context/AuthContextProvider";
import { useFormik } from "formik";
import axios from "axios";
import { baseUrl } from "../../../../Env/Env";
import { useNavigate, useParams } from "react-router-dom";

export default function EditDepartment() {
  const [departments, setDepartments] = useState({});
  const [teachers, setTeachers] = useState([]);

  let { accessToken } = useContext(authContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { departmentId } = useParams();
  const [isLoading, setIsLoading] = useState(false); // للتحكم في الـ spinner

  // ✅ استدعاء البيانات عند تحميل الصفحة
  useEffect(() => {
    fetchDepartments();
    fetchTeacherHead();
  }, []);

  async function fetchDepartments() {
    try {
      const response = await axios.get(`${baseUrl}Department/${departmentId}`, {
        headers: {
          Accept: "text/plain",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Fetched data:", response.data.result.name);
      setDepartments(response.data.result);
      formik.setFieldValue("name", response.data.result.name);
    } catch (error) {
      setError(error.message);
    }
  }
  async function fetchTeacherHead() {
    try {
      const response = await axios.get(
        `${baseUrl}Teacher?DepartmentId=${departmentId}`,
        {
          headers: {
            Accept: "text/plain",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Fetched data:", response.data.result.data);
      setTeachers(response.data.result.data);
    } catch (error) {
      setError(error.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: departments.name,
      departmentHeadId: "", // ID بتاع رئيس القسم
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.put(
          `${baseUrl}Department/${departmentId}`,
          {
            name: values.name,
            departmentHeadId: values.departmentHeadId, // تأكد من الاسم اللي الـ API عايزه
          },
          {
            headers: {
              Accept: "text/plain",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Updated successfully:", response.data);
        navigate("/SuperAdminRole/ManageDepartments"); // لو عايز يرجع لصفحة الأقسام بعد التعديل
      } catch (error) {
        console.error("Error updating department:", error);
        setError("Failed to update department");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={Inputs.container}>
        <div className={Inputs.text}>
          <span className={AddText.text}>Edit</span> Department
        </div>
        <div className={AddText.line}></div>

        {/* Department Name */}
        <div className={Inputs.inputContainer}>
          <label htmlFor="name">Department Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}
        </div>

        {/* ✅ قائمة اختيار رئيس القسم */}
        <div className={Inputs.inputContainer}>
          <label htmlFor="departmentHead">Department Head</label>
          <select
            id="departmentHeadId"
            name="departmentHeadId"
            onChange={formik.handleChange}
            value={formik.values.departmentHeadId}
            required
          >
            <option value="" disabled>
              {departments.departmentHeadFullName}
            </option>
            {teachers?.length > 0 &&
              teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.fullName}
                </option>
              ))}
          </select>
        </div>

        {/* ✅ زر الحفظ */}
        <div className={ButtonDesign.button}>
          <button type="submit">Edit</button>
        </div>

        {/* ✅ عرض الخطأ إن وجد */}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </div>
    </form>
  );
}
