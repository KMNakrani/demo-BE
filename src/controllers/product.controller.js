import { ProductModel } from "../models/product.model.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const {
      body: { title, images, sizes ,description},
    } = req;
    const user = await ProductModel.create({ title, images, sizes,description });
    return res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      data: null,
    });
  }
};

// List Product
export const listProduct = async (req, res) => {
  try {

    const products = await ProductModel.find();

    return res.status(200).json({
      success: true,
      message: "Products get successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      data: null,
    });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const { params: {
      id
    } } = req

    const product = await ProductModel.findOne({
      _id: id
    });
    if (!product) {
      return res.status(404).json({
        success: true,
        message: "Product not found",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product get successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
      data: null,
    });
  }
};
