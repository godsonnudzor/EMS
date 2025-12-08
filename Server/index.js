import express from 'express';
import cors from 'cors';
import authRoutes from './Routes/Auth.js';
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import connectdb from './config/db.js';
import path from 'path';

connectdb();
const app = express();
app.use(cors());
app.use(express.json());
//app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join('public', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

