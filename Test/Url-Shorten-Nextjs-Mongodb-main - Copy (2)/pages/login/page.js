import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";

function LoginForm() {
  const [userData, setUserData] = useState({ user: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        // Handle successful login
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["sign-in-container"]}>
        <div className={styles["sign-in-header"]}>
          <h3 className={styles["sign-in-title"]}>Sign In</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles["sign-in-body"]}>
          <div className={styles["input-wrapper"]}>
            <input
              className={styles["input-field"]}
              type="text"
              name="user"
              value={userData.user}
              onChange={handleInputChange}
              placeholder="User"
            />
            <label className={styles["input-label"]}>User</label>
          </div>
          <div className={styles["input-wrapper"]}>
            <input
              className={styles["input-field"]}
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <label className={styles["input-label"]}>Password</label>
          </div>
          <div className={styles["checkbox-wrapper"]}>
            <label className={styles["checkbox-label"]}>
              <input className={styles["checkbox"]} type="checkbox" />
              Remember Me
            </label>
          </div>
          <button className={styles["sign-in-button"]} type="submit">
            Sign In
          </button>
        </form>
        <div className={styles["sign-in-footer"]}>
          <p className={styles["sign-up-link"]}>
            Don't have an account?{" "}<Link href={"/pages/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
