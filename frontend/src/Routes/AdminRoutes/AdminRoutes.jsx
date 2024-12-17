import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Business from '../../Pages/Admin/Business/Business'
import UserDashboard from '../../Pages/Users/UserDashboard'

const AuthenticationRoute = () => {
  return (
    <Routes>
        <Route path="dashboard" element={<UserDashboard />}/>
        <Route path='business' element={<Business/>}/>
    </Routes>

  )
}

export default AuthenticationRoute