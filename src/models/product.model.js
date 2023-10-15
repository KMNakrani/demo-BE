import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    title: {
        type: String
    },
    images: [{
        url: [],
        color: String
    }],
    sizes: [{
        size: String,
        price: String
    }],
    description: {
        type: String
    }
});

// export model
export const ProductModel = model('Product', productSchema)