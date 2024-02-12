import Product from "../models/product.model"

export async function getProducts(req, res) {
    const {category, brand} = req.query

    const query: any = {}

    if (category) {
        query.categories = category;
    }
    if (brand) {
        query.brand = brand;
    }

    const products = await Product.find(query)

    res.send(products)
}
export async function getProductById(req, res) {
    const productId = req.params.productId

    try {
        const product = await Product.findById(productId).exec()
        if (!product) {
            throw new Error('not exist')
        }
        res.send(product);
    } catch {
        res.status(404).send({message: 'not found'})
    }
}