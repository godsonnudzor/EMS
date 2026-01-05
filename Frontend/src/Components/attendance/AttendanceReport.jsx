import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);  
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append('date', dateFilter);
      }
      const response = await axios.get(`${API_URL}/api/attendance/report?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        if(skip ===0){
          setReport(response.data.attendance);
        }else{
          setReport((prevData) => ({ ...prevData, ...response.data.attendance }));
        }
      }
      setLoading(false);
    } catch (error) {
        alert(error.message);
    }
  };

  useEffect(() => {
    fetchReport();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dateFilter]);
  return (
    <div className='min-h-screen'>
      <h2 className='text-center text-2xl font-bold'>Attendance Report</h2>
      <div>
        <h2 className='text-xl font-semibold'>Filter by Date:</h2>
        <input
        className='border bg-gray-100'
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
          {loading ? <div>Loading...</div> : report && Object.entries(report).map(([date, record]) => (
            <div>
              <h3 className='text-lg font-semibold mt-4'>Date: {date}</h3>
              <table className='w-full mt-4'>
                <thead>
                  <tr>
                    <th className='border border-gray-400 p-2'>S.No</th>
                    <th className='border border-gray-400 p-2'>Employee ID</th>
                    <th className='border border-gray-400 p-2'>Employee Name</th>
                    <th className='border border-gray-400 p-2'>Department</th>
                    <th className='border border-gray-400 p-2'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {record.map((data, index) => (
                    <tr key={data.employeeId}>
                      <td className='border border-gray-400 p-2'>{index + 1}</td>
                      <td className='border border-gray-400 p-2'>{data.employeeId}</td>
                      <td className='border border-gray-400 p-2'>{data.name}</td>
                      <td className='border border-gray-400 p-2'>{data.dep_name}</td>
                      <td className='border border-gray-400 p-2'>{data.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          ))}
      </div>
    </div>
  );
}

export default AttendanceReport
