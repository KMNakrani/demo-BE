import {Router} from "express"
import { addUserController } from "../contollers/user.controller.js"

const userRouter =  Router()

userRouter.post('', addUserController)

export default userRouter