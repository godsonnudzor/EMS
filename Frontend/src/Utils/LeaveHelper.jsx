import React from 'react'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line react-refresh/only-export-components
export const columns = [
    {
        name : "SNO",
        selector : (row) => row.sno,
        width : '60px'
    },
     {
        name : "Emp ID",
        selector : (row) => row.employeeId,
        width : '150px'
    },
     {
        name : "Name",
        selector : (row) => row.name,
        width : '150px'
    },
     {
        name : "Leave Type",
        selector : (row) => row.leaveType,
        width : '150px'
    },
     {
        name : "Department ",
        selector : (row) => row.department,
        width : '150px',
        sortable : true
    },
     {
        name : "Days",
        selector : (row) => row.days,
        width : '60px'
    },
     {
        name : "Status",
        selector : (row) => row.status,
        width : '100px'
    },
     {
        name : "Action",
        selector : (row) => row.action
    }
]
export const LeaveButtons = ({ id }) => {
    const navigate = useNavigate();
    const handleView =  async(id) => {
        navigate(`/admin-dashboard/leaves/${id}`);
    };
    return (
        <div className='flex space-x-3'>
            
            <button className="px-3 py-1 bg-orange-400 text-white"
                 onClick={() => handleView(id)} >
                View
            </button>

        </div>
    )
}