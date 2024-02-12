import Brand from "../models/brand.model";
import Category from "../models/category.model";

export async function getAllBrands(req, res) {
    const categoryId = req.query.category;

    if (categoryId) {
        let category
        try {
             category = await Category
                .findOne({_id: categoryId})
                .select('brands')
                .populate('brands')
        } catch {
            //
        }

        if (category) {
            res.send(category.brands)
        } else {
            res.status(404).send({message: 'category not exist'})
        }
    } else {
        const allBrands = await Brand.find({})
        res.send(allBrands)
    }
}