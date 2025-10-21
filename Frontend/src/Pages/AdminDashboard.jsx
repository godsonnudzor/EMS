import React from 'react'
import { useAuth } from '../Context/authContext'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../Components/dashboard/AdminSidebar'
import NavBar from '../Components/dashboard/NavBar'
import AdminSummary from '../Components/dashboard/AdminSummary'

const AdminDashboard = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  if (loading) {
    return <div>loading....</div> 
  }
  if (!user) {
    navigate('/login')
  }

  return (
    <div className='flex'>
       <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100'>
       <NavBar/>
       <Outlet/>
      </div>
      

    </div>
  )
}

export default AdminDashboard