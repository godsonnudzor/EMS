import path from "path";
import Employee from "../models/Employee.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      address,
      joiningDate,
      gender,
      maritalStatus,
      designation,
      password,
      department,
      salary,
      role,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role: "employee",
      profileImage: req.file ? `/uploads/${req.file.filename}` : "",
    });
    const savedUser = await newUser.save();
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      address,
      joiningDate,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      role,
    });
    await newEmployee.save();
    res
      .status(200)
      .json({ success: true, message: "Employee added successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getEmployees = async (req, res) => {
  try {
   // const { id } = req.params;
    const employees = await Employee.find({})
      .populate("userId", { password: 0 })
      .populate("department");
      console.log('Fetched Employee Count:', employees.length); // Should be >= 0
      if (employees.length > 0) {
        console.log('Sample Employee Data (first):', employees[0]); // Check if userId and department are populated
      } else {
        console.log('No employees found')
      }
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get employees server Error" });
  }
};
export { addEmployee, getEmployees, upload };
