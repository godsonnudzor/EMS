import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaBuilding, FaCalendar, FaCogs, FaMoneyBillWave, FaRegAddressCard, FaTachometerAlt, FaUserFriends} from 'react-icons/fa'
import User from '../../../../Server/Models/User'
import {AiOutlineFileText} from 'react-icons/ai'

const AdminSidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-teal-600 h-12 items-center justify-center'>
            <h3 className='text-2xl text-center font-pacific'>Employees Ms</h3>
        </div>
        <div className='px-4'>
        <NavLink to="/admin-dashboard"
                className={({isActive}) => `${isActive ? " bg-teal-600 " : " " } 
                flex items-center space-x-4 block py-2.5 px-4 rounded`} 
                end>
                <FaTachometerAlt />
                <span>DashBoard</span>
        </NavLink>

        <NavLink to="/admin-dashboard/employees"
            className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}
            >
            <FaUserFriends />
            <span>Employees</span>
        </NavLink>
        <NavLink to="/admin-dashboard/departments"
            className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaBuilding />
            <span>Department</span>
        </NavLink>
        <NavLink to="/admin-dashboard/leaves"
             className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaCalendar />
            <span>Leave</span>
        </NavLink>
        <NavLink to={`/admin-dashboard/salary/add/${User._id}`}
            className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaMoneyBillWave />
            <span>Salary</span>
        </NavLink>
        <NavLink to={`/admin-dashboard/attendance`}
            className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaRegAddressCard />
            <span>Attendance</span>
        </NavLink>
        <NavLink to={`/admin-dashboard/attendance-report`}
            className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <AiOutlineFileText  />
            <span>Attendance Report</span>
        </NavLink>
        <NavLink to="/admin-dashboard/setting"
             className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaCogs />
            <span>Setting</span>
        </NavLink>
        </div>   
    </div>
  )
}

export default AdminSidebar
