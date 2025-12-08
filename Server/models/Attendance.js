import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
    employeeId : {type : mongoose.Schema.Types.ObjectId, ref : "Employee", required : true},
    date : {type : String, // format 'YYYY-MM-DD' 
        required : true},
    status : {type : String, 
        enum : ['Present', 'Absent', 'Leave', 'leave'],
         default: 'Null' }
    });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
    