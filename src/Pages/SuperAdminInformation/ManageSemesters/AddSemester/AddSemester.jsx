import React, { useContext, useEffect, useState } from "react";
import Inputs from "../../../../Shared/Css/InputsDesign.module.css";
import AddText from "../../../../Shared/Css/AddTextDesign.module.css";
import ButtonDesign from "../../../../Shared/Css/ButtonDesign.module.css";
import { authContext } from "../../../../Context/AuthContextProvider";
import { useFormik } from "formik";
import axios from "axios";
import { baseUrl } from "../../../../Env/Env";
import * as Yup from "yup";

export default function AddSemester() {
  const { accessToken } = useContext(authContext);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  // Fetch departments and their courses from the endpoint
  const fetchDepartmentsWithCourses = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}Department/departments-with-courses`,
        {
          headers: {
            Accept: "text/plain",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setDepartments(res.data.result); // Assuming result contains the array of departments with courses
    } catch (error) {
      console.error("Error fetching departments with courses:", error);
      setError("Failed to fetch departments and courses.");
    }
  };

  useEffect(() => {
    fetchDepartmentsWithCourses();
  }, []);

  const formik = useFormik({
    initialValues: {
      semesterType: "",
      startDate: "",
      endDate: "",
      enrollmentOpen: "",
      enrollmentClose: "",
      departmentId: "",
      courseId: "",
    },
    validationSchema: Yup.object({
      semesterType: Yup.string().required("Semester Type is required"),
      startDate: Yup.date().required("Start Date is required"),
      endDate: Yup.date().required("End Date is required"),
      enrollmentOpen: Yup.date().required("Enrollment Open is required"),
      enrollmentClose: Yup.date().required("Enrollment Close is required"),
      departmentId: Yup.string().required("Department is required"),
      courseId: Yup.string().required("Course is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(
          `${baseUrl}Semester`,
          {
            semesterType: values.semesterType,
            startDate: values.startDate,
            endDate: values.endDate,
            enrollmentOpen: values.enrollmentOpen,
            enrollmentClose: values.enrollmentClose,
            departmentId: values.departmentId,
            courseId: values.courseId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        alert("Semester added successfully!");
        formik.resetForm();
      } catch (error) {
        console.error("Error submitting semester:", error);
        alert("Failed to add semester");
      }
    },
  });

  // Filter courses based on the selected department
  const filteredCourses =
    departments.find((dept) => dept.id === formik.values.departmentId)
      ?.courses || [];

  // Reset courseId when department changes
  useEffect(() => {
    if (formik.values.departmentId) {
      formik.setFieldValue("courseId", "");
    }
  }, [formik.values.departmentId]);

  return (
    <form onSubmit={formik.handleSubmit} className={Inputs.container}>
      <div className={Inputs.text}>
        <span className={AddText.text}>Add</span> New Semester
      </div>
      <div className={AddText.line}></div>

      <div className={Inputs.inputContainer}>
        <label htmlFor="semesterType">Semester Type</label>
        <select
          id="semesterType"
          name="semesterType"
          onChange={formik.handleChange}
          value={formik.values.semesterType}
          className={Inputs.options}
        >
          <option value="" disabled>
            Select Semester Type
          </option>
          <option value="first-term">First Term</option>
          <option value="second-term">Second Term</option>
          <option value="summer-course">Summer Course</option>
        </select>
        {formik.touched.semesterType && formik.errors.semesterType && (
          <div className="text-red-500 text-sm">
            {formik.errors.semesterType}
          </div>
        )}
      </div>

      <div className={Inputs.inputRow}>
        <div className={Inputs.inputContainer}>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            onChange={formik.handleChange}
            value={formik.values.startDate}
          />
          {formik.touched.startDate && formik.errors.startDate && (
            <div className="text-red-500 text-sm">
              {formik.errors.startDate}
            </div>
          )}
        </div>
        <div className={Inputs.inputContainer}>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            onChange={formik.handleChange}
            value={formik.values.endDate}
          />
          {formik.touched.endDate && formik.errors.endDate && (
            <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
          )}
        </div>
      </div>

      <div className={Inputs.inputRow}>
        <div className={Inputs.inputContainer}>
          <label htmlFor="enrollmentOpen">Enrollment Open</label>
          <input
            type="date"
            id="enrollmentOpen"
            name="enrollmentOpen"
            onChange={formik.handleChange}
            value={formik.values.enrollmentOpen}
          />
          {formik.touched.enrollmentOpen && formik.errors.enrollmentOpen && (
            <div className="text-red-500 text-sm">
              {formik.errors.enrollmentOpen}
            </div>
          )}
        </div>
        <div className={Inputs.inputContainer}>
          <label htmlFor="enrollmentClose">Enrollment Close</label>
          <input
            type="date"
            id="enrollmentClose"
            name="enrollmentClose"
            onChange={formik.handleChange}
            value={formik.values.enrollmentClose}
          />
          {formik.touched.enrollmentClose && formik.errors.enrollmentClose && (
            <div className="text-red-500 text-sm">
              {formik.errors.enrollmentClose}
            </div>
          )}
        </div>
      </div>

      <div className={Inputs.inputContainer}>
        <label htmlFor="departmentId">Department</label>
        <select
          id="departmentId"
          name="departmentId"
          onChange={formik.handleChange}
          value={formik.values.departmentId}
          className={Inputs.options}
        >
          <option value="" disabled>
            Select Department
          </option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.departmentName} {/* Adjust based on API response */}
            </option>
          ))}
        </select>
        {formik.touched.departmentId && formik.errors.departmentId && (
          <div className="text-red-500 text-sm">
            {formik.errors.departmentId}
          </div>
        )}
      </div>

      <div className={Inputs.inputContainer}>
        <label htmlFor="courseId">Course</label>
        <select
          id="courseId"
          name="courseId"
          onChange={formik.handleChange}
          value={formik.values.courseId}
          className={Inputs.options}
          disabled={!formik.values.departmentId} // Disable until department is selected
        >
          <option value="" disabled>
            Select Course
          </option>
          {filteredCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        {formik.touched.courseId && formik.errors.courseId && (
          <div className="text-red-500 text-sm">{formik.errors.courseId}</div>
        )}
      </div>

      <div className={ButtonDesign.button}>
        <button type="submit">Submit</button>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
}
