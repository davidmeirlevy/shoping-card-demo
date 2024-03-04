import Category from "../models/category.model";

export async function getAllCategories(req, res) {

    const q: string = (req.query.q || '') || ''

    const query: any = {}
    if (q && typeof q === 'string' && q.length > 2) {
        query.name = new RegExp(q, 'i');  // /NIK/i
    }

    const allCategories = await Category.find(query)

    res.send(allCategories)
}