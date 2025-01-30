import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from "../components/user/Header";
import Footer from "../components/shared/Footer";

function UserLayout() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default UserLayout