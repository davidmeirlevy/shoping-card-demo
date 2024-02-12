import mongoose from "mongoose";

export async function connectToDb() {
    await Promise.all([
        mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/todos'),
        import('./brand.model'),
        import('./category.model'),
        import('./product.model')
    ])

    console.log('coonected to db!');
}