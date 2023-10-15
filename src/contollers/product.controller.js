import { productModel } from "../models/product.model.js"

// Add Product
export const addProductController = async (req, res) => {
    try {
        const { body: {
            title,
            images,
            sizes,
            description
        } } = req

        const product = await productModel.create({
            title,
            images,
            sizes,
            description
        })
        res.status(201).json({
            message: "Product added",
            data: product
        })
    } catch (error) {
        console.log("Error =>", error)
        res.status(500).json({
            message: "Internal server error",
            data: null
        })
    }

}

// Get Products
export const getProductsController = async (req, res) => {
    try {
        const product = await productModel.find()

        res.status(201).json({
            message: "Get Products",
            data: product
        })
    } catch (error) {
        console.log("Error =>", error)
        res.status(500).json({
            message: "Internal server error",
            data: null
        })
    }

}

// Get Product
export const getSingleProductController = async (req, res) => {
    try {
        const { params: {
            id
        } } = req

        const product = await productModel.findOne({
            _id: id
        })
        res.status(201).json({
            message: "Get Product",
            data: product
        })
    } catch (error) {
        console.log("Error =>", error)
        res.status(500).json({
            message: "Internal server error",
            data: null
        })
    }

}