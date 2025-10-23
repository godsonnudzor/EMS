import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../Utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [departments, setDepartments] = React.useState([]);
    const [formData, setFormData] = useState({});
   

    useEffect(() => {
            const getDepartments = async () => {
                const departments = await fetchDepartments();
                setDepartments(departments);
            };
            getDepartments();
    }, []);
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        });
        // Handle form submission logic here
        try {
            const response = await axios.post('http://localhost:5000/api/employee/add',
                 formDataObj, {
                headers : {
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
              navigate('/admin-dashboard/employees');
            }
        } catch(error) {
          console.log(error);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    };
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md '>
      <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/** Name Field */}
            <div>
                <label className='block text-sm font-medium text-gray-400 mb-1'>
                    Name
                </label>
                <input type="text" 
                 name='name'
                 placeholder='Insert Name'
                 onChange={handleChange}
                 className=' mt-1 block border border-gray-300 p-2 w-full rounded-md'
                 required 
                 />
            </div>
          {/** Email Field */}
          <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Email
              </label>
              <input type="email" 
               name='email'
               placeholder=' Email'
               onChange={handleChange}
               className=' mt-1 block border border-gray-300 p-2 w-full rounded-md'
               required 
              />
          </div>
          {/** Employee id Field */}
          <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Employee ID
              </label>
              <input type="text" 
               name='employeeId'
               placeholder=' Employee ID'
               onChange={handleChange}  
               className=' mt-1 block border border-gray-300 p-2 w-full rounded-md'
               required 
              />
          </div>
            {/** date of birth Field */}
          <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Date of Birth
              </label>
              <input type="date" 
               name='dob'
               placeholder=' DOB'
               onChange={handleChange}
               className=' mt-1 block border border-gray-300 p-2 w-full rounded-md'
              />
          </div>
          {/** Address Field  */}
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Address
              </label>
              <textarea name='address'
               placeholder='Address'
               onChange={handleChange}
               className='mt-1 block border border-gray-300 p-2 w-full rounded-md'
              />
            </div>
            {/** Joining Date Field */}
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Joining Date
              </label>
              <input type="date" 
               name='joiningDate'
                placeholder=' Joining Date'
                onChange={handleChange}
               className='mt-1 block border border-gray-300 p-2 w-full rounded-md' 
              />
            </div>
            {/** gender  Field */}
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Gender
              </label>
                <select name="gender" 
                onChange={handleChange}
                className='mt-1 block border border-gray-300 p-2 w-full rounded-md' 
                > 
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
          </div>
            {/** Marital Status  */}
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Marital Status
              </label>
                <select name="maritalStatus"
                onChange={handleChange}
                 className='mt-1 block border border-gray-300 p-2 w-full rounded-md' 
                > 
                  <option value="">Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>       
             </div>
            {/** Designation Field */}  
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Designation
              </label>
              <input type="text" 
               name='designation'
               placeholder=' Designation'
               className=' mt-1 block border border-gray-300 p-2 w-full rounded-md'
               onChange={handleChange}
              />
            </div>
            {/** Department Field */}  
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>  
                  Department
              </label>
              <select name="department"
                onChange={handleChange} 
                className='mt-1 block border border-gray-300 p-2 w-full rounded-md'
               required>
                    <option value="">Select Department</option>
                   {departments.map((dep) => (
                      <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                    ))} 

              </select>
            </div>
            {/** Salary Field */}
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Salary
              </label>
              <input type="number" 
               name='salary'
               placeholder=' Salary'
               onChange={handleChange}
               className=' mt-1 block border border-gray-300 p-2 w-full rounded-md'
               required 
              />    
            </div>
            {/** password Field  */}
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Password
              </label>
              <input type="password" 
               name='password'
               placeholder=' *******'
               className=' mt-1 block border border-gray-300 p-2 w-full rounded-md'
               onChange={handleChange}
               required 
              />    
            </div>
            {/** Role Field  */}
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Role
              </label>
              <select name="role" 
                onChange={handleChange}
              className='mt-1 block border border-gray-300 p-2 w-full rounded-md'
               required>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
              </select>
            </div>
            {/** image upload Field  */}
            <div>
              <label className='block text-sm font-medium text-gray-400 mb-1'>
                  Image Upload
              </label>
              <input type="file" 
               name='image'
               accept='image/*'
               placeholder='Upload Image'
               className='mt-1 block border border-gray-300 p-2 w-full rounded-md'
               onChange={handleChange}
              />
            </div>
        </div>
        <button type="submit"
            className='w-full mt-6 px-4 py-2 font-bold bg-teal-600 text-white rounded-md'>
            Add Employee
        </button>
      </form>
    </div>
  )
}

export default Add
