import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    mainImage: {
        type: String,
    },
    galleryImages: [{
        type: String,
    }],
    price: {
        type: Number,
        default: 0
    },
    amountInStock: {
        type: Number,
        default: -1
    },
    sku: {
        type: String, 
    },
    tags: [String],
    categories: [{
        type: ObjectId,
        ref: 'Category'
    }],
    brand: {
        type: ObjectId,
        ref: 'Brand'
    }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product