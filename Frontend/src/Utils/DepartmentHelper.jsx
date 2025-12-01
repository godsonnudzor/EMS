import { useNavigate } from 'react-router-dom'
import axios from 'axios' 
export const columns = [
    {
        name : "SNO",
        selector : (row) => row.sno
    },
     {
        name : "Department Name",
        selector : (row) => row.dep_name,
        sortable : true
    },
     {
        name : "Action",
        selector : (row) => row.Action
    }
];
export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();
    const handleDelete =  async(id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");
        if (confirmDelete) {
        // Implement delete functionality here
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                    headers : {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                   onDepartmentDelete();
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }} else {
                // User cancelled deletion
                return;
            }
    };
    return (
        <div className='flex space-x-3'>
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/edit-department/${_id}`)}>
                Edit
            </button>
            <button className="px-3 py-1 bg-orange-400 text-white"
                 onClick={() => handleDelete(_id)} >
                Delete
            </button>

        </div>
    )
}