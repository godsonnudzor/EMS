import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Login from './Pages/Login'
import AdminDashboard from './Pages/AdminDashboard'
import EmployeeDashboard from './Pages/EmployeeDashboard'
import Unauthorized from './Pages/Unauthorized'
import PrivateRoutes from './Utils/PrivateRoutes'
import RoleBaseRoutes from './Utils/RoleBaseRoutes'
import AdminSummary from './Components/dashboard/AdminSummary'
import DepartmentList from './Components/departments/DepartmentList'
import AddDepartments from './Components/departments/AddDepartments'
import EditDepartment from './Components/departments/EditDepartment'
import List from './Components/employee/List'
import Add from './Components/employee/Add'
import View from './Components/employee/View'
import Edit from './Components/employee/Edit'
import AddSalary from './Components/salary/Add'
import ViewSalary from './Components/salary/view'
import Summary from './Components/EmployeeDashboard/Summary'


function App() {
  return (
   <Router>
     <Routes>
       <Route path="/" element={<Navigate to="/admin-dashboard"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes required={['admin']}>
              <AdminDashboard />
            </RoleBaseRoutes>  
          </PrivateRoutes>         
          } >
          <Route index element={<AdminSummary/>}/>
          <Route path='/admin-dashboard/departments' element={<DepartmentList/>}/>
          <Route path='/admin-dashboard/add-departments' element={<AddDepartments/>}/>
          <Route path='/admin-dashboard/edit-department/:id' element={<EditDepartment/>}/>
          <Route path='/admin-dashboard/employees' element={<List/>}/>
          <Route path='/admin-dashboard/add-employee' element={<Add/>}/>
          <Route path='/admin-dashboard/employees/:id' element={<View/>}/>
          <Route path='/admin-dashboard/employees/edit/:id' element={<Edit/>}/>
          <Route path='/admin-dashboard/employees/salary/:id' element={<ViewSalary/>}/>

          <Route path='/admin-dashboard/salary/add/' element={<AddSalary/>}/>
          
          </Route>
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes required={['admin','employee']}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        } >
          <Route index element={<Summary/>}/>

          <Route path='/employee-dashboard/profile/:id' element={<View/>}/>
          



        </Route>
     </Routes>
   </Router>
  )
}

export default App
