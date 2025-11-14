import mongoose from "mongoose";
import { Schema } from "mongoose";
const leaveSchema = new mongoose.Schema({

    employeeId : {type : Schema.Types.ObjectId, ref:'Employee', required : true},
    leaveType : {type : String,
        enum : ['sickLeave','casualLeave','annualLeave'],
         required : true  },
    startDate   : {type : Date, required : true},
    endDate   : {type : Date, required : true},
    reason : {type : String},
    status: {type : String,
        enum :['Pending','Approved','Rejected'],
        default:'Pending'
    },
    createdAt : {type : Date, default : Date.now},
    updatedAt : {type : Date, default : Date.now}  
});

const Leave = mongoose.model("leave", leaveSchema);
export default Leave;
