import React, { useEffect } from 'react'
import { useState } from 'react';
import {Link } from 'react-router-dom'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
import DataTable from 'react-data-table-component'
import {columns, AttendanceHelper} from '../../Utils/AttendanceHelper'

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
   const [loading, setLoading] = useState(false);
   const [filteredAttendance, setFilteredAttendance] = useState([])

       const fetchAttendance = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${API_URL}/api/attendance`, {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      if (response.data.success) {
       // Inside your fetchAttendance function...
  const data = response.data.attendance.map((att, index) => ({
  employeeId: att.employeeId.employeeId,
  sno: index + 1,
  department: att.employeeId.department.dep_name,
  name: att.employeeId.userId.name ,
  action: (<AttendanceHelper status={att.status} />)
}));
        setAttendance(data);
        setFilteredAttendance(data);
      }
      console.log(response.data);
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {

    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((emp) => (
      emp.employeeId.employeeId.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredAttendance(records)
  };
  if (!filteredAttendance) {
    return <div>Loading...</div>; 
  }
  return (
    <div className='p-6'> 
      <div className='text-center '>
        <h3 className='text-2xl font-bold'>Manage Attendance</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" 
        placeholder='Search by Emp Name' 
        className='px-4 py-0.5 border'
        onChange={handleFilter}
         />
         <p>Mark Employees for {new Date().toLocaleDateString().split("T")[0]}{""}</p>
        <Link to='/admin-dashboard/attendance-report' 
        className='px-4 py-1 bg-teal-600 rounded text-white'
        > Attendance Report </Link>
      </div>
      <div className='mt-4'>
        <DataTable 
          progressPending={loading}
          pagination
          columns={columns}
          data={filteredAttendance}
        />
      </div>
    </div>
  )
}


export default Attendance
