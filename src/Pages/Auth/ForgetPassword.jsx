import React, { useState } from "react";
import styles from "./ForgetPassword.module.css";
import axios from "axios";
import { baseUrl } from "../../Env/Env";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await axios.post(
        `${baseUrl}Account/forgot-password?RedirectUrl=https://www.google.com/`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "text/plain",
          },
        }
      );
      setMessage("If this email is registered, a reset link has been sent.");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.forgetPasswordContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Forgot Password</h2>
        <p className={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <input
          type="email"
          className={styles.input}
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => (window.location.href = "/Login")}
        >
          Back To Login
        </button>
        {message && <div className={styles.success}>{message}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}
