import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const View = () => {
  const {id} = useParams();
  const [employee, setEmployee] = useState([])
     useEffect(() => {
    const fetchEmployee = async () => {
      try {const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
        headers : {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        setEmployee(response.data.employee);
      }
      } catch (error) {
         if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
           }
    };
    fetchEmployee();
  }, [])

  return (
    <div>
      <div>
        <img src={`http//:localhost:5000/${employee.userId.profileImage}`} />
      </div>
    </div>
  )
}

export default View