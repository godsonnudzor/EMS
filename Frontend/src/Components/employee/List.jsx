import React, { useEffect } from 'react'
import { useState } from 'react';
import {Link } from 'react-router-dom'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
import DataTable from 'react-data-table-component'
import {columns, EmployeeButtons} from '../../Utils/EmployeeHelper'

const List = () => {
  const [employees, setEmployees] = useState([]);
   const [empLoading, setEmpLoading] = useState(false);
   const [filteredEmployees, setFilterEmployees] = useState([])

    useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get(`${API_URL}/api/employee`, {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        const data = response.data.employees.map((emp, index) => ({
          _id: emp._id,
          sno: index + 1,
          dep_name: emp.department?.dep_name || '-',
          name: emp.userId?.name || '-',
          dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : '-',
          // pass the stored path/URL string; EmployeeHelper will construct the final src
          profileImage: <img width={40} className='rounded-full' src={`http://localhost:3000/${emp.userId.profileImage}`}/>,
          action : (<EmployeeButtons id={emp._id}/>)
        }));
        setEmployees(data);
        setFilterEmployees(data);
      }
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
      } finally {
        setEmpLoading(false);
      }
    }
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilterEmployees(records)

  }

  return (
    <div className='p-6'> 
      <div className='text-center '>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" 
        placeholder='Search by Emp Name' 
        className='px-4 py-0.5 border'
        onChange={handleFilter}
         />
        <Link to='/admin-dashboard/add-employee' 
        className='px-4 py-1 bg-teal-600 rounded text-white'
        >Add New Employee</Link>
      </div>
      <div className='mt-4'>
        <DataTable 
          progressPending={empLoading}
          pagination
          columns={columns}
          data={filteredEmployees}
        />
      </div>
    </div>
  )
}

export default List
