import React, { useContext, useEffect, useState } from "react";
import SearchNotification from "../../../Shared/Css/SearchInputNotification.module.css";
import styles from "./DashboardStudent.module.css";
import Information from "../../../../src/Shared/Css/InfoAndInformation.module.css";
import axios from "axios";
import { baseUrl } from "../../../Env/Env";
import { authContext } from "../../../Context/AuthContextProvider";

export default function DashboardStudent() {
  const [studentData, setStudentData] = useState(null); // State for student details
  const { accessToken } = useContext(authContext);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch the student data and ID
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}Student`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      });
      const student = response.data.result; // Access result directly
      console.log("Student data:", student);

      if (student && student.id) {
        setStudentData(student); // Store the initial student data
        fetchStudentData(student.id); // Fetch detailed data using the ID
      } else {
        throw new Error("No student ID found in response");
      }
    } catch (error) {
      console.error("Error fetching student:", error.message);
      const errorMessage = error.response?.data?.message || error.message;
      alert(errorMessage);
    }
  };

  // Fetch detailed student data by ID
  const fetchStudentData = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}Student/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      });
      const data = response.data.result; // Adjust based on actual response structure
      console.log("Student details:", data);
      setStudentData(data); // Update with detailed student data
    } catch (error) {
      console.error("Error fetching student details:", error.message);
      const errorMessage = error.response?.data?.message || error.message;
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchData(); // Only call fetchData, which will trigger fetchStudentData
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className={SearchNotification.searchWrapper}>
        <div className={SearchNotification.searchContainer}>
          <div className={SearchNotification.inputWrapper}>
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search"
              className={SearchNotification.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className={SearchNotification.notificationIcon}>
            <i className="far fa-bell"></i>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.cardsContainer}>
          <div className={`${styles.card} ${styles.cardBg1}`}>
            <div className={styles.cardLeft}>
              <div className={`${styles.iconCircle} ${styles.circle1}`}>
                <i className="fas fa-building"></i>
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.description}>Credit Hours</div>
              <div className={styles.number}>
                {studentData ? studentData.obtaindehours : "Loading..."}
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.cardBg2}`}>
            <div className={styles.cardLeft}>
              <div className={`${styles.iconCircle} ${styles.circle2}`}>
                <i className="fa-solid fa-user-graduate fa-flip-horizontal"></i>
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.description}>Level</div>
              <div className={styles.number}>
                {studentData ? studentData.level : "Loading..."}
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.cardBg3}`}>
            <div className={styles.cardLeft}>
              <div className={`${styles.iconCircle} ${styles.circle3}`}>
                <i className="fa-solid fa-user-tie"></i>
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.description}>GPA</div>
              <div className={styles.number}>
                {studentData ? studentData.gpa || "N/A" : "Loading..."}
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.cardBg4}`}>
            <div className={styles.cardLeft}>
              <div className={`${styles.iconCircle} ${styles.circle4}`}>
                <i className="fa-solid fa-chart-simple"></i>
              </div>
            </div>
            <div className={styles.cardRight}>
              <div className={styles.description}>Courses</div>
              <div className={styles.number}>
                {studentData ? studentData.courses || "N/A" : "Loading..."}
              </div>
            </div>
          </div>
        </div>

        <div className={`${Information.line}`}></div>
      </div>
    </>
  );
}
