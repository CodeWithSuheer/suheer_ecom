import express from "express";
import { protect } from "../middlewares/userMiddleware.js";
import { createProduct, deleteProduct, getAllProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.post('/create', protect, createProduct)
router.get('/getAll', protect, getAllProduct)
router.put('/update', protect, updateProduct)
router.delete('/delete/:id', protect, deleteProduct)

export default router;
