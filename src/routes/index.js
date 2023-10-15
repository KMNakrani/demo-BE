import {Router} from "express"
import authRouter from './auth.route.js'
import productRouter from "./product.route.js"

const routes = Router() 

routes.use('',authRouter)
routes.use('/products',productRouter)

export default routes