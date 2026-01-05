import React from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// eslint-disable-next-line react-refresh/only-export-components
export const columns = [
  {
    name: "SNO",
    selector: (row) => row.sno,
    width: "90px",
    sortable: true,
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    width: "165px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "165px",
    sortable: true,
  },

  {
    name: "Department",
    selector: (row) => row.department,
    width: "150px",
    sortable: true,
  },

  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (status, employeeId) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/attendance/update/${employeeId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        statusChange();
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };
  return (
    <div>
      {status === null ? (
        <div className="flex space-x-8">
          <button
            className="px-4 py-2 bg-green-500 text-white"
            onClick={() => markEmployee("Present", employeeId)}
          >
            Present
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white"
            onClick={() => markEmployee("Absent", employeeId)}
          >
            Absent
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white"
            onClick={() => markEmployee("Leave", employeeId)}
          >
            Leave
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white"
            onClick={() => markEmployee("Sick", employeeId)}
          >
            Sick
          </button>
        </div>
      ) : (
        <p className="bg-gray-500 text-white w-20 text-center py-2 rounded">
          {status}
        </p>
      )}
    </div>
  );
};
