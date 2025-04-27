import React from "react";
import Search from "../../../Shared/Css/SearchInput.module.css";
import styles from "./CoursesScheduled.module.css";
import Table from "../../../Shared/Css/TableDesign.module.css";
import { Link } from "react-router-dom";

export default function CoursesScheduled() {
  return (
    <>
      <div className={Search.searchWrapper}>
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search"
          className={Search.searchInput}
        />
      </div>
      <div className={styles.container}>
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
                <button className={Table.editButton}>
                  <Link className="fas fa-edit"></Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
