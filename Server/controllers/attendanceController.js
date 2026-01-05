import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const getAttendance = async (req, res) => {
  try {
    // Your logic to get attendance records
    const date = new Date().toISOString().split("T")[0];
    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: ["department", "userId"],
    });
    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};
const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];
    const employee = await Employee.findOne({ employeeId });
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date },
      { status },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, attendance: updatedAttendance });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};
    if (date) {
      query.date = date;
    }
    const attendanceData = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: ["department", "userId"],
      }).sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
    const groupData = attendanceData.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }
      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        name: record.employeeId.userId.name,
        department: record.employeeId.dep_name,
        status: record.status || "Not Marked",
      });
      return result;
    },{});
    return res.status(200).json({ success: true, attendance: groupData });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export { getAttendance, updateAttendance, attendanceReport };