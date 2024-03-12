import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Please enter a product name'] },
    item_code: { type: String, unique: true, required: [true, 'Please enter a product item code'] },
    price: { type: Number, required: true, default: 0 },
    description: { type: String, required: [true, 'Please enter a product description'] },
    category: { type: String, required: [true, 'Please enter a product category'] },
    quantity: { type: Number, default: 0 },
    topSales: { type: Boolean, default: false },
    image: {
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true },
    },

}, { timeStamps: true })

export const Product = mongoose.model('Product', productSchema);
