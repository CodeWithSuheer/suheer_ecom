import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel.js';
import { deleteImageToCloudinary, uploadImageToCloudinary } from "../assets/cloudinary.js";


// @desc    Create Product
// @route   POST /api/product/create
// @access  Private
export const createProduct = asyncHandler(async (req, res) => {
    const { name, item_code, price, description, category, quantity, topSales, image } = req.body;

    // Check All Fields
    if (!name || !item_code || !price || !description || !category || !quantity || !image) {
        res.status(400).json({ message: "Please add all fields" });
    }

    if (price <= 0) {
        throw new Error("Price must be greater then 0");
    }

    if (quantity <= 0) {
        throw new Error("Available Quantity must be greater then 0");
    }

    const result = await uploadImageToCloudinary(image, "/products")

    let productQuery = {
        image: {
            public_id: result.public_id,
            secure_url: result.secure_url,
        },
        name,
        item_code,
        price,
        category,
        quantity,
        description,
        topSales,
    }

    const product = await Product.create(productQuery);

    if (product) {
        res.status(201).json({
            success: true,
            message: "Product Created"
        })
    } else {
        await deleteImageToCloudinary(public_id);
        throw new Error("Your data was not uploaded");
        // res.status(400).json({ message: "Invalid User Details" });
    }
})


// @desc    Get All Product
// @route   GET /api/product/create
// @access  Private
export const getAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
})


// @desc    Update Product
// @route   PUT /api/product/create
// @access  Private
export const updateProduct = asyncHandler(async (req, res) => {
    const { id, name, item_code, price, description, category, quantity, topSales, image } = req.body;


    if (price <= 0) {
        throw new Error("Price must be greater then 0");
    }

    if (quantity <= 0) {
        throw new Error("Available Quantity must be greater then 0");
    }

    let productQuery = {
        name,
        item_code,
        price,
        category,
        quantity,
        description,
        topSales,
    }

    if (image) {
        const productData = await Product.findById(id);

        if (productData && productData.image) {
            await deleteImageToCloudinary(productData.image.public_id);
        } else {
            throw new Error("Image nae ha bhai");
        }

        const { public_id, secure_url } = image;

        // Check if 'secure_url' is a valid URL
        if (typeof secure_url === 'string' && secure_url.startsWith('http')) {
            const imageData = {
                public_id,
                secure_url,
            };
            productQuery = { ...productQuery, image: imageData };
        } else {
            // Handle the case where 'secure_url' is not a valid URL
            throw new Error("Invalid 'secure_url' in the image data");
        }
    }

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(id, productQuery, { new: true });

    if (!updatedProduct) {
        throw new Error("Your data was not updated");
    }

    res.status(200).json({
        success: true,
        message: "Product Updated",
        data: updatedProduct,
    });
})


// @desc    Delete Product
// @route   DELETE /api/product/create
// @access  Private
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(400)
        throw new Error('Product not found')
    }

    deleteImageToCloudinary(product.image.public_id);
    await product.deleteOne()

    res.status(200).json({
        id: req.params.id,
        message: "Product deleted"
    });
})
