import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminRoot() {
  return (
    <>
        <header>
            <h1>Admin Header</h1>
        </header>
        <Outlet />
        <footer>
            <h1>Admin Footer</h1>
        </footer>
    </>
  )
}

export default AdminRoot