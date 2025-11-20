import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../Context/authContext.jsx'
import axios from 'axios';      

const list = () => {
  const {user} = useAuth();
  const [leaves, setLeaves] = useState([]);
  let sno = 1;
   const fetchLeaves = async () => {
      try {const response = await axios.get(`http://localhost:3000/api/leave/${user._id}`,
        {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data)
      if (response.data.success) {
        setLeaves(response.data.leaves);
      } 
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
             }
           }
    };
     useEffect(() => { 
    fetchLeaves();
  }, [])
  return (
    <div className='p-6'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leave</h3>
            <div className='flex justify-between items-center'>
                <input type="text" 
                placeholder='Search by Dep Name'
                className='px-4 py-0.5 border'    
                />
            </div>
            <Link
            to='/employee-dashboard/add-leave'
            className='px-4 py-1 bg-teal-600 rounded text-white'
            >
            Add New Leave
            </Link>

        </div>
         <table className='w-full text-sm text-left text-gray-300'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                <tr>
                    <th className='px-6 py-3'>SNO</th>
                    <th className='px-6 py-3'>leave Type</th>
                    <th className='px-6 py-3'>From</th>
                    <th className='px-6 py-3'>TO</th>
                    <th className='px-6 py-3'>Description</th>
                    <th className='px-6 py-3'>Status</th>
                </tr>
            </thead>
                <tbody>
                    {leaves.map((leave) => (
                        <tr
                        key={leave._id}
                        className='bg-gray border-b dark:bg-gray-800 dark:border-gray-700'
                        >
                            <td className='py-3 px-6'>{sno++}</td>
                             <td className='py-3 px-6'>{leave.leaveType}</td>
                            <td className='py-3 px-6'>{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className='py-3 px-6'>{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className='py-3 px-6'>{leave.reason}</td>
                            <td className='py-3 px-6'>{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
           </table> 
      
    </div>
  )
}

export default list
