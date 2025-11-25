import Leave from '../models/Leave.js'
import Employee from '../models/Employee.js'


const addLeave = async(req, res) => {
 try {
        const {userId, leaveType, startDate, endDate, reason} = req.body;
        const employee = await Employee.findOne({userId})
        const newLeave = new Leave ({
            employeeId : employee._id,leaveType,startDate,endDate,reason
        })
        await newLeave.save() 
        return res.status(200).json({success :true })
    } catch(error) {
        return res.status(500).json({success:false, error:'Leave server Error'})
    }
}
const getLeave = async(req, res) => {
    try {
        const {id} = req.params;
        const employee = await Employee.findOne({userId: id})
        const leaves = await Leave.find({employeeId: employee._id})
        return res.status(200).json({success:true, leaves})
    } catch (error) {
        return res.status(500).json({success:false, error:'Get Leave Server Error'})
    }   
}
const getLeaves = async(req, res) => {
    try {
        const leaves = await Leave.find().populate({ 
            path: 'employeeId',
            populate:[
                { 
                    path: 'department',
                    select: 'dep_name'
                 },
                 
                 {
                    path: 'userId',
                    select: 'name '
                 }
            ] 
         })
        return res.status(200).json({success:true, leaves})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, error:'Get Leaves Server Error'})
    }
}
const getLeaveDetail = async(req, res) => {
    const {id} = req.params;
     try {
        const leave = await Leave.findById({_id: id}).populate({ 
            path: 'employeeId',
            populate:[
                { 
                    path: 'department', 
                    select: 'dep_name'
                 },
                 
                 {
                    path: 'userId',
                    select: 'name, profileImage '
                 }
            ] 
         })
        return res.status(200).json({success:true, leave})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, error:'Get Leaves Server Error'})
    }
    
}

const updateLeave = async(req, res) => {
    console.log(req.body.status)
    try {
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status:req.body.status})
        if (!leave) {
            return res.status(404).json({success:false, error:'Leave not found'})
        }
        return res.status(200).json({success:true})
    } catch (error) {
        return res.status(500).json({success:false, error:'Update Leave Server Error'})
    }
}
export {addLeave, getLeave, getLeaves, getLeaveDetail,updateLeave }