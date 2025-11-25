import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { columns, LeaveButtons } from '../../Utils/LeaveHelper'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
import DataTable from 'react-data-table-component'

const Table = () => {
    const [leaves, setLeaves] = useState(null);
    const [filteredLeaves, setFilteredLeaves] = useState(null); 
    const fetchLeaves = async () => {
      // Fetch leave data logic here
       try {
        const response = await axios.get(`${API_URL}/api/leave`, {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data)
      if (response.data.success) {
        const data = response.data.leaves.map((leave, index) => ({
          _id: leave._id,
          sno: index + 1,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId?.name ,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days: Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1,
          startDate: new Date(leave.startDate).toLocaleDateString(),
          endDate: new Date(leave.endDate).toLocaleDateString(),
          status: leave.status,
          action : (<LeaveButtons id={leave._id}/>)
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
    useEffect(() => { 
    fetchLeaves();
  }, []);
    const filterByInput = (e) => {
      const data = leaves.filter(leave => 
        leave.employeeId.toString().toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredLeaves(data);
    };
    const filterByButton = (status) => {
      
      const data = leaves.filter(leave => 
        leave.status === status
      );  
      setFilteredLeaves(data);
    };
  return ( 
    <>
    {filteredLeaves ? (
    <div className='p-6'>
        <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Leave</h3>
            <div className='flex justify-between items-center'>
                <input type="text" 
                placeholder='Search by Employee ID'
                className='px-4 py-0.5 border'
                onChange={filterByInput}    
                />
            </div>
            <div className='space-x-3'>
                <button 
                className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                onClick={() => filterByButton('Pending')}>
                  Pending
                </button>
                <button 
                    className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                    onClick={() => filterByButton('Approved')}>
                      Approved
                </button>
                <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'
                  onClick={() => filterByButton('Rejected')}>
                    Rejected
                </button>
            </div>     
        </div>
        <div className='mt-3'>
          <DataTable
            columns={columns}
            data={filteredLeaves}
            pagination
            highlightOnHover
            pointerOnHover
          />
        </div>
    </div>
    ): <div>Loading...</div>}
    </>
  )
}

export default Table
