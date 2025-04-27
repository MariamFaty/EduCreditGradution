import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Search from "../../../../Shared/Css/SearchInput.module.css";
import styles from "./InfoEachDepartmentSemester.module.css";
import Information from "../../../../../src/Shared/Css/InfoAndInformation.module.css";
import Table from "../../../../Shared/Css/TableDesign.module.css";
import Pagination from "../../../../Shared/Css/Pagination.module.css";
import { authContext } from "../../../../Context/AuthContextProvider";
import { baseUrl } from "../../../../Env/Env";

export default function InfoEachDepartmentInSemester() {
  const { accessToken } = useContext(authContext);
  const { departmentId, departmentName } = useParams();
  const [semesterId, setSemesterId] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 5;

  // Fetch the current semester
  const fetchCurrentSemester = async () => {
    try {
      const response = await axios.get(`${baseUrl}Semester/CurrentSemester`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSemesterId(response.data.result.id);
      setError(null);
    } catch (error) {
      console.error("Error fetching semester:", error.message);
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
    }
  };

  // Fetch courses for the department and semester
  const fetchCourses = async () => {
    if (!semesterId) return;
    try {
      console.log("semesterId used:", semesterId);
      const response = await axios.get(`${baseUrl}Course`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          departmentId: departmentId,
          semesterId: semesterId,
        },
      });
      setAllCourses(response.data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      setError(error.response?.data?.message || error.message);
    }
  };

  // First useEffect: Fetch semesterId
  useEffect(() => {
    if (departmentId) {
      fetchCurrentSemester();
    } else {
      setError("Department ID is missing.");
    }
  }, [departmentId]);

  // Second useEffect: Fetch courses when semesterId changes
  useEffect(() => {
    if (semesterId) {
      fetchCourses();
    }
  }, [semesterId]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter courses based on search term
  const filteredCourses = allCourses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / pageSize);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openDeleteModal = (course) => {
    alert(`Delete course ${course.name}`);
  };

  return (
    <>
      {/* Search Bar */}
      <div className={Search.searchWrapper}>
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search"
          className={Search.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.container}>
        {/* Department Name */}
        <p className={styles.title}>{departmentName || "Department"}</p>

        {/* Error Message */}
        {error && (
          <div className="error" style={{ color: "red", marginBottom: "10px" }}>
            Error: {error}
          </div>
        )}

        {/* Available Courses Section */}
        <p className={styles.coursetitle}>Available Courses in this Semester</p>

        {/* Courses Table */}
        <table className={Table.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((course, index) => (
                  <tr key={course.id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{course.name}</td>
                    <td>
                      <button className={Table.infoButton}>
                        <Link
                          to={`/SuperAdminRole/InfoEachDepartment/InfoEachCourse/${course.id}`}
                          className="fa-solid fa-circle-info"
                        ></Link>
                      </button>
                      <button className={Table.editButton}>
                        <Link
                          className="fas fa-edit"
                          to={`/SuperAdminRole/InfoEachDepartment/EditEachCourse/${course.id}`}
                        ></Link>
                      </button>
                      <button
                        className={Table.deleteButton}
                        onClick={() => openDeleteModal(course)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="3">No courses available.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className={Pagination.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={Pagination.pageButton}
          >
            ← Back
          </button>

          <div className={Pagination.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${Pagination.pageNumber} ${
                  currentPage === page ? Pagination.activePage : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={Pagination.pageButton}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
}
