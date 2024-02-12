import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brands: [{
        type: ObjectId,
        ref: 'Brand'
    }]
})

const Category = mongoose.model('Category', CategorySchema)

export default Category