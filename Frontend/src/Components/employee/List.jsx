import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import {EmployeeButtons, columns} from '../../Utils/EmployeeHelper'

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
   useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get('http://localhost:5000/api/employee', {
          headers : {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          console.log(response.data.employees)
        let sno = 1;
        const data = await response.data.employees.map((emp) => (
          {
            _id : emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name, 
            dob : new Date(emp.dob).toLocaleDateString(),
            profileImage : emp.userId.profileImage,

            Action: emp.Action = (<EmployeeButtons id={emp._id}  />),
          }
        ));
        setEmployees(data);
      }
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
      } finally {
        setEmpLoading(false)
      }
    }; 
    fetchEmployees();
  }, []);

  return (
    <div className='p-6'> 
      <div className='text-center '>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search by Employee Name' 
        className='px-4 py-0.5 border'
         />
        <Link to='/admin-dashboard/add-employee' 
        className='px-4 py-1 bg-teal-600 rounded text-white'
        >Add New Employee</Link>
      </div>
      <div className='mt-4'>
        <DataTable 
          columns={columns}
          data={employees}
          progressPending={empLoading}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>
    </div>
  )
}

export default List
