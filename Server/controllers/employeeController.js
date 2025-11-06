import path from "path";
import Employee from "../models/Employee.js";
import User from "../Models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import Department from '../models/Department.js'

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
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get employees server Error" });
  }
};

const getEmployee = async (req, res) => {
  try {
   const { id } = req.params;
    const employee = await Employee.findById({_id:id})
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get employee server Error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
    } = req.body;
    const employee = await Employee.findById({_id : id})
    if (!employee) {
      return res
      .status(404)
      .json({ success: false, error: " Employee not found" }); 
    }
    const user = await User.findById({_id :employee.userId})
     if (!user) {
      return res
      .status(404)
      .json({ success: false, error: " User not found" }); 
    }
    const updateUser = await User.findByIdAndUpdate({_id : employee.userId}, {name,})
    const updateEmployee = await Employee.findByIdAndUpdate({_id : id}, {
      maritalStatus,
      designation,
      department,
      salary
    })
    if (!updateUser || !updateEmployee) {
      return res
      .status(404)
      .json({ success: false, error: " Document not found" })
    }
    return res.status(202).json({success : true, message : 'Employee Updated'})
    

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Update employee server Error" });


  }
 
}


export { addEmployee, getEmployees, upload,getEmployee,updateEmployee };
