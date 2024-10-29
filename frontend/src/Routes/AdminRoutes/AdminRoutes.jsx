import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../../Pages/Admin/AdminDashboard'

const AuthenticationRoute = () => {
  return (
    <Routes>
        <Route path="dashboard" element={<AdminDashboard />}/>
    </Routes>

  )
}

export default AuthenticationRoute