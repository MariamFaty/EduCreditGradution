import React, { useContext, useEffect, useState } from "react";
import Inputs from "../../../../Shared/Css/InputsDesign.module.css";
import AddText from "../../../../Shared/Css/AddTextDesign.module.css";
import ButtonDesign from "../../../../Shared/Css/ButtonDesign.module.css";
import { authContext } from "./../../../../Context/AuthContextProvider";
import { useFormik } from "formik";
import axios from "axios";
import { baseUrl } from "../../../../Env/Env";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

export default function EditCourse() {
  const [course, setCourse] = useState({});
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let { accessToken } = useContext(authContext);
  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    fetchCourse();
    fetchDepartments();
  }, []);

  async function fetchCourse() {
    try {
      const response = await axios.get(`${baseUrl}Course/${courseId}`, {
        headers: {
          Accept: "text/plain",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Course data:", response.data.result);
      setCourse(response.data.result);
      formik.setValues({
        name: response.data.result.name,
        creditHours: response.data.result.creditHours,
        duration: response.data.result.duration,
        minimumDegree: response.data.result.minimumDegree,
        departmentId: response.data.result.department?.id || "",
        previousCourseId: response.data.result.previousCourseId || "",
      });
    } catch (error) {
      setError(error.message);
    }
  }

  async function fetchDepartments() {
    try {
      const response = await axios.get(
        `${baseUrl}Department/departments-with-courses`,
        {
          headers: {
            Accept: "text/plain",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Departments data:", response.data.result);
      setDepartments(response.data.result || []);
    } catch (error) {
      setError("Failed to fetch departments and courses.");
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[A-Za-z\s]{3,50}$/,
        "Name must be 3-50 characters and contain only letters and spaces."
      )
      .required("Name is required"),
    creditHours: Yup.number()
      .typeError("Credit Hours must be a number")
      .positive("Credit Hours must be a positive number")
      .test(
        "is-decimal",
        "Credit Hours must have at most 2 decimal places",
        (value) =>
          value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
      )
      .required("Credit Hours is required"),
    minimumDegree: Yup.number()
      .typeError("Minimum Degree must be a number")
      .required("Minimum Degree is required")
      .when("creditHours", (creditHours, schema) =>
        schema.max(
          creditHours * 100,
          `Minimum Degree must be less than ${creditHours * 100}`
        )
      ),
    departmentId: Yup.string().required("Department is required"),
    previousCourseId: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      creditHours: "",
      duration: "",
      minimumDegree: "",
      departmentNameId: "", // التعديل هنا
      previousCourseId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.put(
          `${baseUrl}Course/${courseId}`,
          {
            name: values.name,
            creditHours: values.creditHours,
            duration: values.duration,
            minimumDegree: values.minimumDegree,
            departmentId: values.departmentId, // التعديل هنا
            previousCourseId: values.previousCourseId || null,
          },
          {
            headers: {
              Accept: "text/plain",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Updated successfully:", response.data);
        navigate("/SuperAdminRole/ManageCourses");
      } catch (error) {
        console.error(
          "Error updating course:",
          error.response?.data || error.message
        );
        setError("Failed to update course");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const filteredCourses =
    departments.find((dept) => dept.id === formik.values.departmentId)
      ?.courses || [];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={Inputs.container}>
        <div className={Inputs.text}>
          <span className={AddText.text}>Edit</span> Course
        </div>
        <div className={AddText.line}></div>

        {/* Course Name */}
        <div className={Inputs.inputContainer}>
          <label htmlFor="name">Course Name</label>
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

        {/* Credit Hours */}
        <div className={Inputs.inputContainer}>
          <label htmlFor="creditHours">Credit Hours</label>
          <input
            type="number"
            id="creditHours"
            name="creditHours"
            onChange={formik.handleChange}
            value={formik.values.creditHours}
            required
          />
          {formik.errors.creditHours && formik.touched.creditHours && (
            <p className="text-red-500 text-sm">{formik.errors.creditHours}</p>
          )}
        </div>

        {/* Duration */}
        <div className={Inputs.inputContainer}>
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            id="duration"
            name="duration"
            onChange={formik.handleChange}
            value={formik.values.duration}
            required
          />
          {formik.errors.duration && formik.touched.duration && (
            <p className="text-red-500 text-sm">{formik.errors.duration}</p>
          )}
        </div>

        {/* Minimum Degree */}
        <div className={Inputs.inputContainer}>
          <label htmlFor="minimumDegree">Minimum Degree</label>
          <input
            type="number"
            id="minimumDegree"
            name="minimumDegree"
            onChange={formik.handleChange}
            value={formik.values.minimumDegree}
            required
          />
          {formik.errors.minimumDegree && formik.touched.minimumDegree && (
            <p className="text-red-500 text-sm">
              {formik.errors.minimumDegree}
            </p>
          )}
        </div>

        {/* Department Selection */}
        <div className={Inputs.inputContainer}>
          <label htmlFor="departmentId">Department Name</label>
          <select
            id="departmentNameId"
            name="departmentNameId"
            onChange={formik.handleChange}
            value={formik.values.departmentNameId} // التعديل هنا
            required
          >
            <option value="" disabled>
              Select Department Name
            </option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.departmentName}
              </option>
            ))}
          </select>
          {formik.errors.departmentId && formik.touched.departmentId && (
            <p className="text-red-500 text-sm">{formik.errors.departmentId}</p>
          )}
        </div>

        {/* Previous Course Selection */}
        <div className={Inputs.inputContainer}>
          <label htmlFor="previousCourseId">Previous Course Name</label>
          <select
            id="previousCourseId"
            name="previousCourseId"
            onChange={formik.handleChange}
            value={formik.values.previousCourseId || ""}
            disabled={!formik.values.departmentId}
          >
            <option value="">None</option>
            {filteredCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.previousCourseName}
              </option>
            ))}
          </select>
          {formik.errors.previousCourseId &&
            formik.touched.previousCourseId && (
              <p className="text-red-500 text-sm">
                {formik.errors.previousCourseId}
              </p>
            )}
        </div>

        {/* Submit Button */}
        <div className={ButtonDesign.button}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? <i className="fas fa-spin fa-spinner"></i> : "Edit"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </form>
  );
}
