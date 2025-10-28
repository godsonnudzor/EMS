import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './Routes/Auth.js';
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import connectdb from './config/db.js';

connectdb();
const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files under the '/uploads' path so stored paths like
// '/uploads/<filename>' resolve correctly. Files are located in Server/public/uploads.
app.use('/uploads', express.static(path.join(path.resolve(), 'Server', 'public', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

