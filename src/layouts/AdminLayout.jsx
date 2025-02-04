import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "../components/shared/Footer";
import { AdminHeader } from "../components/admin/AdminHeader"
function AdminLayout() {
  return (
    <>
        <AdminHeader />
        <Outlet />
        <Footer isAdmin = {true}/>
    </>
  )
}

export default AdminLayout