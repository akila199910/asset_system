import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Employee from '../../Pages/Employee/Employee'

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Employee />} />
    </Routes>
  )
}

export default EmployeeRoutes