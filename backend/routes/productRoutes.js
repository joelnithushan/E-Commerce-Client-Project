import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  addProducts,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
import { verifyUser ,roleBasedAccess} from "../helper/userAuth.js";

const router = express.Router();

router
  .route("/products").get(verifyUser, getAllProducts).post(verifyUser, roleBasedAccess("admin"), addProducts);
//router.get("/product/:id",getSingleProduct);
router
  .route("/product/:id").get(getSingleProduct).put(updateProduct).delete(verifyUser, roleBasedAccess("admin"), deleteProduct);

export default router;
