import React from "react";
import SearchNotification from "../../../Shared/Css/SearchInputNotification.module.css";
import dashboardTeacher from "./DashboardTeacher.module.css";
import Information from "../../../../src/Shared/Css/InfoAndInformation.module.css";
import Table from "../../../Shared/Css/TableDesign.module.css";
import { Link } from "react-router-dom";

export default function DashboardTeacher() {
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
            />
          </div>
          <div className={SearchNotification.notificationIcon}>
            <i className="far fa-bell"></i>
          </div>
        </div>
      </div>
      <div className={dashboardTeacher.container}>
        <div className={dashboardTeacher.cardsContainer}>
          <div
            className={`${dashboardTeacher.card} ${dashboardTeacher.cardBg1}`}
          >
            <div className={dashboardTeacher.cardLeft}>
              <div
                className={`${dashboardTeacher.iconCircle} ${dashboardTeacher.circle1}`}
              >
                <i className="fa-solid fa-user-graduate fa-flip-horizontal"></i>
              </div>
            </div>
            <div className={dashboardTeacher.cardRight}>
              <div className={dashboardTeacher.description}>
                Guidance of Students
              </div>
              <div className={dashboardTeacher.number}>20</div>
            </div>
          </div>
          <div
            className={`${dashboardTeacher.card} ${dashboardTeacher.cardBg2}`}
          >
            <div className={dashboardTeacher.cardLeft}>
              <div
                className={`${dashboardTeacher.iconCircle} ${dashboardTeacher.circle2}`}
              >
                <i className="fas fa-building"></i>
              </div>
            </div>
            <div className={dashboardTeacher.cardRight}>
              <div className={dashboardTeacher.description}>Courses</div>
              <div className={dashboardTeacher.number}>10</div>
            </div>
          </div>

          <div
            className={`${dashboardTeacher.card} ${dashboardTeacher.cardBg3}`}
          >
            <div className={dashboardTeacher.cardLeft}>
              <div
                className={`${dashboardTeacher.iconCircle} ${dashboardTeacher.circle3}`}
              >
                <i className="fa-solid fa-chart-simple"></i>
              </div>
            </div>
            <div className={dashboardTeacher.cardRight}>
              <div className={dashboardTeacher.description}>Success Rate</div>
              <div className={dashboardTeacher.number}>40%</div>
            </div>
          </div>
        </div>

        <div className={`${Information.line}`}></div>
        <p className={dashboardTeacher.coursetitle}>
          Courses Scheduled in this Semester
        </p>

        <table className={Table.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Courses Name</th>
              <th>Count</th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>database</td>
              <td>122</td>
              <td className={Table.actionButtons}>
                <button className={Table.infoButton}>
                  <Link className="fa-solid fa-circle-info"></Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
