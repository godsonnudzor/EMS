import React from "react";
import SummaryCards from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";


const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('http://localhost:3000/api/dashboard/summary', {
          headers : {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }); 
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error || 'Error fetching summary data');
        }
        console.error(error.message);
      }
    };
    fetchSummary();
  },  []) 
  if (!summary) {
    return <div>Loading...</div>;
    
  }
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCards
          icon={<FaUser />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCards
          icon={<FaBuilding />}
          text="Total Department"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        />
        <SummaryCards
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={summary.totalSalaries}
          color="bg-green-600"
        />
      </div>

      <div className="mt-12">
        <h3 className="text-center text-2xl font-bold">Leave Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCards
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-teal-600"
          />
          <SummaryCards
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-green-600"
          />
          <SummaryCards
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-yellow-600"
          />
          <SummaryCards
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
