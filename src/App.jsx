import React, { useState } from "react";
import "./App.css";
// import ThemeToggle from "./components/ThemeToggle";
// import useLocalStorage from "use-local-storage";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Toaster } from "react-hot-toast";

function App() {
  // const [isDark, setIsDark] = useLocalStorage(false);
  // const toggleTheme = () => {
  //   setIsDark(!isDark);
  // };
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
{
  /* <ThemeToggle handleChange={toggleTheme} isChecked={isDark} />
      <h1 className="title">Welcome to FlexiRides Car Rental</h1>
      <div className="box">
        <h2>Book a Car</h2>
         data-theme={isDark ? "dark" : "light"}
      </div> */
}
