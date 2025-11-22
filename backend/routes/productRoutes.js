import express from "express";
import { getAllProducts,getSingleProduct,addProducts } from "../controller/productController.js";

const router=express.Router();

router.route("/products").get(getAllProducts).post(addProducts);
router.get("/product",getSingleProduct);

export  default router;