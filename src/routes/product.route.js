import {Router} from "express"
import { celebrate } from "celebrate"
import {auth} from "../middleware/auth.middleware.js"
import productValidation from "../validation/product.validation.js"
import {addProduct, listProduct,getProduct} from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.post("",auth,celebrate(productValidation.addProductSchema),addProduct)
productRouter.get("",auth, listProduct)
productRouter.get("/:id",auth, getProduct)

export default productRouter