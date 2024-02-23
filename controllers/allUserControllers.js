import userModel from "../models/userModel.js"
export const fetchAllUsers = async (req,res) => {
    console.log('hello world')
    try {
        const allUsers = await userModel.find({})
        console.log(allUsers)
        return res.status(200).send({
            success:true,
            message:"fetched successfully",
            users:allUsers
        })
    } catch (error) {
        res.status(205).send({
            success:false,
            message:"Error while fetching users",
            error
        })
    }
}