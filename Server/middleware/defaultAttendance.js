import Attendance from "../models/Attendance";
import Employee from "../models/Employee";

const defaultAttendance = async (req, res, next) => {
    try {
    const date = new Date().toISOString().split('T')[0] // Get current date in YYYY-MM-DD Thhh:mm:ss.sssZ format;
    const exitingAttendance = await Attendance.findOne({date});
    if (!exitingAttendance) {
        const employees = await Employee.find({});
        const attendanceRecords = employees.map(emp => ({
            employeeId: emp._id,
            date,
            status: null // Default status
        }));
        await Attendance.insertMany(attendanceRecords);
    }
    next();
} catch (error) {
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
    
}
export default defaultAttendance;