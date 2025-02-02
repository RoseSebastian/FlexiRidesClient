import React, { useState } from "react";
import "../../styles/shared/ThemeToggle.css";

const ThemeToggle = ({ handleChange, isChecked }) => {
  let isDarkTheme = localStorage.getItem("isDark");
  const [isDark, setIsDark] = useState(isDarkTheme === "true" ? true : false);
  document
    .querySelector("html")
    .setAttribute("data-theme", isDark ? "dark" : "light");
  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem("isDark", !isDark);
  };

  return (
    <div className="toggle-container">
      <label className="toggle-label">Dark Mode</label>
      <label className="switch">
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
