import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
    }
})

const Brand = mongoose.model('Brand', BrandSchema)

export default Brand