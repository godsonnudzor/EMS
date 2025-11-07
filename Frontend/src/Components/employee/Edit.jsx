import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../Utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [employee, setEmployee] = React.useState({
    name : '',
    maritalStatus : '',
    designation : '',
    salary : 0,
    department : ''
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();

   useEffect(() => {
      const getDepartments = async () => {
        const departments = await fetchDepartments();
        setDepartments(departments);
      };
      getDepartments();
    }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        const employee = response.data.employee
        setEmployee((prev) => ({...prev, name: employee.userId.name,
           maritalStatus : employee.maritalStatus,
           designation : employee.designation,
           salary : employee.salary,
           department : employee.department
          }));
      }
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
             }
           }
    };
    fetchEmployee();
  }, []);
  const handleChange = (e) => {
    const { name, value} = e.target;
      setEmployee((prevData) => ({ ...prevData, [name]: value }));
    }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Handle form submission logic here
    try {
      const response = await axios.put(
        `http://localhost:3000/api/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.log(error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <>{departments && employee ? (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/** Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={employee.name}
              placeholder="Insert Name"
              onChange={handleChange}
              className=" mt-1 block border border-gray-300 p-2 w-full rounded-md"
              required
            />
          </div>
          {/** Marital Status  */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={employee.maritalStatus}
              className="mt-1 block border border-gray-300 p-2 w-full rounded-md"
            >
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          {/** Designation Field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={employee.designation}
              placeholder=" Designation"
              className=" mt-1 block border border-gray-300 p-2 w-full rounded-md"
              onChange={handleChange}
            />
          </div>
          {/** Salary Field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={employee.salary}
              placeholder=" Salary"
              onChange={handleChange}
              className=" mt-1 block border border-gray-300 p-2 w-full rounded-md"
              required
            />
          </div>
           {/** Department Field */}
          <div className="cols-span-2"> 
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Department
            </label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}
              className="mt-1 block border border-gray-300 p-2 w-full rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 px-4 py-2 font-bold bg-teal-600 text-white rounded-md"
        >
          Update Employee
        </button>
      </form>
    </div>
    ) : <div>loading...</div>} </>
  );
};

export default Edit;

