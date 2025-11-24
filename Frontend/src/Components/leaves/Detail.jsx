import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Detail = () => {
  const {id} = useParams();
  const  [ leave, setLeave ] = useState(null)
     useEffect(() => {
    const fetchLeave = async () => {
      try {const response = await axios.get(`http://localhost:3000/api/leave/detail/${id}`, {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data)
      if (response.data.success) {
        setLeave(response.data.leave);
      }
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
             }
           }
    };
    fetchLeave();
  }, [])

  return (
    <>{leave ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-8 text-center'>
        Leave Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
        <img src={`http://localhost:3000${leave.employeeId.userId.profileImage}`} 
        className='rounded-full border w-72 ' />
      </div>
      <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Name:</p>
        <p className='font-meduim'>{leave.employeeId.userId.name}</p>
      </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Emp ID:</p>
        <p className='font-meduim'>{leave.employeeId.employeeId}</p>
      </div>
      <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Leave Type:</p>
        <p className='font-meduim'>{leave.leaveType}</p>
      </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Reason:</p>
        <p className='font-meduim'>{leave.reason}</p>
      </div>
       <div className= 'flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Department:</p>
        <p className='font-meduim'>{leave.employeeId.department.dep_name}</p>
      </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Start Date:</p>
        <p className='font-meduim'>{ new Date(leave.startDate).toLocaleDateString()}</p>
      </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>End Date:</p>
        <p className='font-meduim'>{new Date(leave.endDate).toLocaleDateString()}</p>
      </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Status:</p>
        <p className='font-meduim'>{leave.status}</p>
      </div>

      </div>
      
    </div>
    ): <div>loading...</div> }</>
    
  ) 
}

export default Detail