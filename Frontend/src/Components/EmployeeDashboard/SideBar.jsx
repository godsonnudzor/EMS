import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaBuilding, FaCalendar, FaCogs,  FaTachometerAlt, FaUserFriends} from 'react-icons/fa'
import { useAuth } from '../../Context/authContext'

const Sidebar = () => {
    const {user} = useAuth()
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-teal-600 h-12 items-center justify-center'>
            <h3 className='text-2xl text-center font-pacific'>Employees Ms</h3>
        </div>
        <div className='px-4'>
        <NavLink to="/employee-dashboard"
                className={({isActive}) => `${isActive ? " bg-teal-600 " : " " } 
                flex items-center space-x-4 block py-2.5 px-4 rounded`} 
                end>
                <FaTachometerAlt />
                <span>DashBoard</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/profile/${user._id}`}
            className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}
            >
            <FaUserFriends />
            <span>My Profile</span>
        </NavLink>
        <NavLink to="/employee-dashboard/leaves"
            className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaBuilding />
            <span>Leaves</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/salary/${user._id}`}
            className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaCalendar />
            <span>Salary</span>
        </NavLink>
        
        <NavLink to="/employee-dashboard/setting"
            className={({isActive}) => `${isActive ? " bg-teal-600 " : " " }
             flex items-center space-x-4 block py-2.5 px-4 rounded`}>
            <FaCogs />
            <span>Setting</span>
        </NavLink>
        </div>   
    </div>
  )
}

export default Sidebar
