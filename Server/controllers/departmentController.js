import Department from "../models/Department.js";


const getDepartments = async (req, res) => {
    try{
        const departments = await Department.find();
        return res.status(200).json({success : true, departments})

    } catch(error) {
        return res.status(500).json({success : false, error : 'Get department server Error'})
    }
}
const addDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body;
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success : true, department :newDep})
    } catch(error) {
        return res.status(500).json({success : false, error : 'Add department server Error'})
    }
}
const getDepartment = async (req, res) => {
    try {
        const {id} = req.params;

        const department = await Department.findById({_id: id});
        return res.status(200).json({success : true, department })
    } catch(error) {
        return res.status(500).json({success : false, error : 'Edit department server Error'})
    }
}
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body; 
        const updatedDepartment = await Department.findByIdAndUpdate(
            { _id: id },
            { dep_name, 
                description }
        );
        return res.status(200).json({ success: true, updatedDepartment });
        
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Update department error:", error); 
        return res.status(500).json({ success: false, error: 'Update department server Error' });
    } 
}
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDepartment = await Department.findById({ _id: id });
        await deletedDepartment.deleteOne();
        return res.status(200).json({ success: true, message: 'Department deleted successfully' , deletedDepartment});
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Delete department server Error' });
    }      
}
export {addDepartment, getDepartments, getDepartment, updateDepartment,deleteDepartment}