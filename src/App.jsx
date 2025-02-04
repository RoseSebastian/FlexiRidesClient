import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "./components/shared/Loader";  

function App() {
  const isLoading = useSelector((state) => state.app.isLoading);
  
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      {isLoading && <Loader />}
    </>
  );
}

export default App;
