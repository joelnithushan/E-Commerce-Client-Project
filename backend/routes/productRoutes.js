import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  addProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const router = express.Router();

router.route("/products").get(getAllProducts).post(addProducts);
//router.get("/product/:id",getSingleProduct);
router.route("/product/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct);

export default router;
