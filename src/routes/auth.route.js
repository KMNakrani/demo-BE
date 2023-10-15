import {Router} from "express"
import {celebrate} from "celebrate"
import authValidation from "../validation/auth.validation.js"
import {registration, login} from "../controllers/auth.controller.js"

const authRouter = Router()

authRouter.post("/signup",celebrate(authValidation.registrationSchema),registration)
authRouter.post("/login",celebrate(authValidation.loginSchema), login)

export default authRouter