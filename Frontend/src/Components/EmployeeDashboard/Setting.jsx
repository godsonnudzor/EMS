import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/authContext'
import axios from 'axios'

const Setting = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [setting, setSetting] = useState({
        userId : user._id,
        oldPassword : "",
        newPassword : "",
        confirmPassword : ""
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSetting({...setting, [name] : value})
        
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Set Password do not match");
            return;
        } else {
            try {            
                const response = await axios.put('http://localhost:3000/api/setting/change-password',
                     setting, {
                headers : {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (response.data.success) {
                alert('Password changed successfully');
                navigate('/employee-dashboard');
                 setError('');
            }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                }
            }
    }}
  return (
   <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h3 className='text-2xl font-bold mb-6'>Change Password</h3>
        <p className='text-red-600'>{error}</p>
        <form onSubmit={handleSubmit}>
            <div>
                <label  className='text-sm font-medium text-gray-700
                '>Old Password</label>
                <input type="password" 
                name='oldPassword' 
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                onChange={handleChange}
                placeholder='Old Password'  />
            </div>
            <div>
                <label  className='text-sm font-medium text-gray-700
                '>New Password</label>
                <input type="password" 
                name='newPassword' 
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                onChange={handleChange}
                placeholder='New Password'  />
            </div>
            <div>
                <label  className='text-sm font-medium text-gray-700
                '>Confirm Password</label>
                <input type="password" 
                name='confirmPassword' 
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                onChange={handleChange}
                placeholder='Confirm Password'  />
            </div>
             <div className='mt-3'>
                <button type='submit' 
                    className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
                    Change Password
                </button>
            </div>
        </form>
    </div>
  )
}

export default Setting