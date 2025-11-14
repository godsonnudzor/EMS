import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use Vite environment variable for API base (falls back to localhost:3000)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const columns = [
    {
        name : "SNO",
        selector : (row) => row.sno,
        width: '90px',
        sortable:true

    },
    {
      name: 'Image',
      // selector kept for filtering/sorting libraries; cell provides rendered image
      selector: (row) => row.profileImage
      },
     {
        name : "Name",
        selector : (row) => row.name,
        width: '165px',
        sortable:true
    },
    
    {
        name : "Department",
        selector : (row) => row.dep_name,
        width: '150px',
        sortable:true
    },
    {
        name : "DOB",
        selector : (row) => row.dob,
        width: '95px'
    },
  {
    name: 'Action',
    // pass a consistent prop name 'id' to EmployeeButtons so it can navigate correctly
    cell: row => <EmployeeButtons id={row._id} />,
    width:"350px",
   
  }
];

export const fetchDepartments = async () => {
    let departments = [];
  try {
      const response = await axios.get('http://localhost:3000/api/department', {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        departments = response.data.departments;
   
      }
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
      }
      return departments;
    }; 
    // employees for salary form
    export const getEmployees = async (id) => {
    let employees = [];
  try {
      const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        employees = response.data.employees;
   
      }
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
      }
      return employees;
    }; 
    

  export const EmployeeButtons = ({ id }) => {
    const navigate = useNavigate();

    return (
      <div className="flex space-x-3">
        <button
          className="px-3 py-1 bg-teal-600 text-white"
          onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
        >
          View
        </button>
        <button 
            className="px-3 py-1 bg-blue-400 text-white"
           onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
        >
          Edit
        </button>
        <button className="px-3 py-1 bg-yellow-400 text-white"
         onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}
        >
         Salary
        </button>
        <button className="px-3 py-1 bg-red-400 text-white">Leave</button>
      </div>
    );
  };