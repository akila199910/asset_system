import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../../Pages/Admin/AdminDashboard'
import Business from '../../Pages/Admin/Business/Business'

const AuthenticationRoute = () => {
  return (
    <Routes>
        <Route path="dashboard" element={<AdminDashboard />}/>
        <Route path='business' element={<Business/>}/>
    </Routes>

  )
}

export default AuthenticationRoute