import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const columns = [
    {
        name : "SNO",
        selector : (row) => row.sno
    },
     {
        name : "Name",
        selector : (row) => row.name,
        sortable : true
    },
    {
        name : "Image",
        selector : (row) => row.profileImage,
        cell: (row) => <img src={row.profileImage} className="w-12 h-12 rounded-full" />,
    },
    {
        name : "Department",
        selector : (row) => row.dep_name,
        sortable : true
    },
    {
        name : "DOB",
        selector : (row) => row.dob,
        sortable : true
    },
     {
        name : "Action",
        selector : (row) => row.Action
    }
]
export const fetchDepartments = async () => {
    let departments = [];
  try {
      const response = await axios.get('http://localhost:5000/api/department', {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        departments = await response.data.departments;
   
      }
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
      }
      return departments;
    }; 

    export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate();
    return (
        <div className='flex space-x-3'>
            <button className="px-3 py-1 bg-teal-600 text-white"
                >
                View
            </button>
            <button className="px-3 py-1 bg-blue-400 text-white" >
                Edit
            </button>
            <button className="px-3 py-1 bg-red-600 text-white" >
                Delete
            </button>
            <button className="px-3 py-1 bg-yellow-600 text-white" >
                Salary
            </button>
            <button className="px-3 py-1 bg-red-600 text-white" >
                Leave
            </button>

        </div>
    )
}