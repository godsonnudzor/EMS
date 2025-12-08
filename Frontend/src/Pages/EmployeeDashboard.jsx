import React from 'react'
import SideBar from '../Components/EmployeeDashboard/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/dashboard/NavBar'

const EmployeeDashboard = () => {
  return (
    <div className='flex'>
       <SideBar/>
      <div className='flex-1 ml-64 bg-gray-100'>
       <NavBar/>
       <Outlet/>
      </div>
    </div>
  )
}

export default EmployeeDashboard