import React, {useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";
// import ThemeToggle from "./components/ThemeToggle";
// import useLocalStorage from "use-local-storage";
import { Header } from "./components/Header";

function App() {
  // const [isDark, setIsDark] = useLocalStorage(false);
  // const toggleTheme = () => {
  //   setIsDark(!isDark);
  // };
  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default App;
{/* <ThemeToggle handleChange={toggleTheme} isChecked={isDark} />
      <h1 className="title">Welcome to FlexiRides Car Rental</h1>
      <div className="box">
        <h2>Book a Car</h2>
         data-theme={isDark ? "dark" : "light"}
      </div> */}