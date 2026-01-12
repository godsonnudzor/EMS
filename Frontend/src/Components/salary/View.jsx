import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/authContext';

const View = () => {
  const {id} = useParams();
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  let sno = 1;
  const {user} = useAuth();
   const fetchSalaries = async () => {
      try {const response = await axios.get(`http://localhost:3000/api/salary/${id}/${user.role}`, {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data)
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary)
      } 
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
             }
           }
    };
     useEffect(() => { 
    fetchSalaries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const filterSalaries = (q) => {
    const filterRecords = salaries.filter((leave) => {
        leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    });
    setFilteredSalaries(filterRecords)
  }
  return (
    <> {filteredSalaries === null ? (
        <div>loading...</div>
     ):(
    <div className='overflow-x-auto p-5'>
        <div className=' text-center'>
            <h2 className='text-2xl font-bold'>Salary History </h2>
        </div>
        <div className='flex-justify-end my-3'>
            <input type="text"
            placeholder='Search By EmpID'
            className='border px-2 rounded-md py-0.5 border-gray-300'
            onChange={filterSalaries}
             />
        </div>
    { filteredSalaries.length > 0 ?(
           <table className='w-full text-sm text-left text-gray-300'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                <tr>
                    <th className='px-6 py-3'>SNO</th>
                    <th className='px-6 py-3'>Emp ID</th>
                    <th className='px-6 py-3'>Salary</th>
                    <th className='px-6 py-3'>Allowance</th>
                    <th className='px-6 py-3'>Deduction</th>
                    <th className='px-6 py-3'>Total</th>
                    <th className='px-6 py-3'>Pay Date</th>
                </tr>
            </thead>
                <tbody>
                    {filteredSalaries.map((salary) => (
                        <tr
                        key={salary.id}
                        className='bg-gray border-b dark:bg-gray-800 dark:border-gray-700'
                        >
                            <td className='py-3 px-6'>{sno++}</td>
                            <td className='py-3 px-6'>{salary.employeeId.employeeId}</td>
                            <td className='py-3 px-6'>{salary.basicSalary}</td>
                            <td className='py-3 px-6'>{salary.allowances}</td>
                            <td className='py-3 px-6'>{salary.deductions}</td>
                            <td className='py-3 px-6'>{salary.netSalary}</td>
                            <td className='py-3 px-6'>{new Date(salary.payDate).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
           </table> 
        ): <div>No Records</div> }
      </div>
    ) }
    </>   
  ); 
};

export default View