import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectDB from './db/db.js';

const userRegister = async () => {
  try {
    await connectDB();
    const hashedPassword = await bcrypt.hash('kekeli12', 10);
    const userRegister = new User({
      name: 'Godson',
      email: 'godsonnudzor@gmail.com',
      password: hashedPassword,
      role: 'admin',
    });
    await userRegister.save();
  } catch (error) {
    console.error('Error during user registration:', error);
  }
};
userRegister();
export default userRegister;
