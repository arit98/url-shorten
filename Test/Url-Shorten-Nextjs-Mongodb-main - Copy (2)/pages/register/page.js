import React, { useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";

function RegisterForm() {
  const [userData, setUserData] = useState({
    name: "",
    user: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

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
          <h3 className={styles["sign-in-title"]}>Register</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles["sign-in-body"]}>
          <div className={styles["input-wrapper"]}>
            <input
              className={styles["input-field"]}
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
            <label className={styles["input-label"]}>Full Name</label>
          </div>
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
              <input
                checked={rememberMe}
                onChange={handleCheckboxChange}
                className={styles["checkbox"]}
                type="checkbox"
              />
              Remember Me
            </label>
          </div>
        </form>
        <div className={styles["sign-in-footer"]}>
          <button className={styles["sign-in-button"]} type="submit">
            Register
          </button>
          <p className={styles["sign-up-link"]}>
            Don't have an account? <Link href={"/pages/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
