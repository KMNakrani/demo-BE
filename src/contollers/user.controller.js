import { userModel } from "../models/user.model.js"

// Add Product
export const addUserController = async (req, res) => {
    try {
        const { body: {
            email,
            password
        } } = req

        const user = await userModel.create({
            email,
            password
        })

        res.status(200).json({
            message: "User created",
            data: user,
            code: 200
        })
    } catch (error) {
        console.log("Error =>", error)
        res.status(500).json({
            message: "Internal server error",
            data: null
        })
    }

}