import React, { useContext, useEffect, useState } from "react";
import styles from "./AddAdmin.module.css";
import Inputs from "../../../../Shared/Css/InputsDesign.module.css";
import AddText from "../../../../Shared/Css/AddTextDesign.module.css";
import ButtonDesign from "../../../../Shared/Css/ButtonDesign.module.css";
import { authContext } from "../../../../Context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { baseUrl } from "../../../../Env/Env";
import * as Yup from "yup";
export default function AddAdmin() {
  let { accessToken } = useContext(authContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // للتحكم في الـ spinner

  // التحقق من صحة الإدخال
  const validateSchema = Yup.object().shape({
    fullName: Yup.string()
      .matches(
        /^[A-Za-z\s]{3,50}$/,
        "FullName must be 3-50 characters and contain only letters and spaces."
      )
      .required("Name is required"),
    email: Yup.string()
      .email("invalid Email format")
      .required("Email is required"),
    address: Yup.string()
      .matches(
        /^[A-Za-z\s]{3,100}$/,
        "FullName must be 3-50 characters and contain only letters and spaces."
      )
      .required("address is required"),
    nationalId: Yup.string()
      .matches(
        /^\d{10,15}$/,
        "nationalId must start with a letter and be 10-15 characters"
      )
      .required("nationalId is required"),
    phoneNumber: Yup.string()
      .matches(
        /^\+?[0-9]{10,15}$/,
        "Phone number must start with '+' and contain 10 to 15 digits"
      )
      .required("Phone number is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female"], "Invalid gender selection")
      .required("Gender is required"),
    birthDate: Yup.date()
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "You must be at least 18 years old"
      )
      .required("Birth date is required"),
  });

  // إعداد formik
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      address: "",
      nationalId: "",
      phoneNumber: "",
      gender: "",
      birthDate: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Submitting values:", values);
      setIsLoading(true);
      setError(""); // إعادة تعيين الخطأ

      try {
        const response = await axios.post(
          `${baseUrl}Account/UserRegistration?role=1&RedirectUrl=https%3A%2F%2Fwww.google.com.eg%2F`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Response:", response);

        if (response.status === 200 || response.status === 201) {
          alert("Admin added successfully!");
          navigate("/SuperAdminRole/ManageAdmins");
          resetForm();
        } else {
          throw new Error("Failed to add Admin");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError("Error adding Admin. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // لمتابعة أي تغيير في القيم
  useEffect(() => {
    console.log("Formik values:", formik.values);
  }, [formik.values]);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={Inputs.container}>
          <div className={Inputs.text}>
            <span className={AddText.text}>Add</span> New Admin
          </div>
          <div className={AddText.line}></div>

          <div className={Inputs.inputContainer}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="error">{formik.errors.fullName}</div>
            ) : null}
          </div>

          <div className={Inputs.inputContainer}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="error">{formik.errors.address}</div>
            ) : null}
          </div>

          <div className={Inputs.inputRow}>
            <div className={Inputs.inputContainer}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="error">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>

            <div className={Inputs.inputContainer}>
              <label htmlFor="nationalId">National Id</label>
              <input
                type="text"
                id="nationalId"
                name="nationalId"
                value={formik.values.nationalId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nationalId && formik.errors.nationalId ? (
                <div className="error">{formik.errors.nationalId}</div>
              ) : null}
            </div>
          </div>

          <div className={Inputs.inputContainer}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className={Inputs.inputRow}>
            <div className={Inputs.inputContainer}>
              <label htmlFor="birthDate">Birth Date</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.birthDate && formik.errors.birthDate ? (
                <div className="error">{formik.errors.birthDate}</div>
              ) : null}
            </div>

            <div className={Inputs.inputContainer}>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="error">{formik.errors.gender}</div>
              ) : null}
            </div>
          </div>

          <div className={ButtonDesign.button}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? (
                <i className="fas fa-spin fa-spinner"></i>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>
      </form>
    </>
  );
}
