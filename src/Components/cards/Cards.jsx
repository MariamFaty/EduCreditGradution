import React from "react";
import styles from "./Cards.module.css";
import { Link } from "react-router-dom";

export default function Cards() {
  return (
    <>
      <div className={styles.cardsContainer}>
        <div className={`${styles.card} ${styles.cardBg1}`}>
          <div className={styles.cardLeft}>
            <div className={`${styles.iconCircle} ${styles.circle1}`}>
              <i className="fas fa-building"></i>
            </div>
          </div>
          <div className={styles.cardRight}>
            <div className={styles.description}>Departments</div>
            <div className={styles.number}>15</div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.cardBg2}`}>
          <div className={styles.cardLeft}>
            <div className={`${styles.iconCircle} ${styles.circle2}`}>
              <i className="fa-solid fa-user-graduate fa-flip-horizontal"></i>
            </div>
          </div>
          <div className={styles.cardRight}>
            <div className={styles.description}>Students</div>
            <div className={styles.number}>7K+</div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.cardBg3}`}>
          <div className={styles.cardLeft}>
            <div className={`${styles.iconCircle} ${styles.circle3}`}>
              <i className="fa-solid fa-user-tie"></i>
            </div>
          </div>
          <div className={styles.cardRight}>
            <div className={styles.description}>Teachers</div>
            <div className={styles.number}>300</div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.cardBg4}`}>
          <div className={styles.cardLeft}>
            <div className={`${styles.iconCircle} ${styles.circle4}`}>
              <i class="fa-solid fa-chart-simple"></i>
            </div>
          </div>
          <div className={styles.cardRight}>
            <div className={styles.description}>Success Rate</div>
            <div className={styles.number}>80%</div>
          </div>
        </div>
      </div>
    </>
  );
}
