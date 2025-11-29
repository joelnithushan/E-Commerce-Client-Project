import Product from "../models/productModel.js";
import errorHandler from "../helper/handleError.js";
import APIHelper from "../helper/APIHelper.js";

//create products

export const addProducts = async (req, res) => {
  //console.log(res.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//update product
export const updateProduct = async (req, res, next) => {
  const id = await req.params.id;
  let product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    //return res.status(500).json({ success: false, message: "Product not found" });
    return next(new errorHandler("Product not found", 404));
  }
  return res.status(200).json({ success: true, product });
};

//delete product
export const deleteProduct = async (req, res, next) => {
  const id = await req.params.id;
  let product = await Product.findByIdAndDelete(id);

  if (!product) {
    //return res.status(500).json({ success: false, message: "Product not found" });
    return next(new errorHandler("Product not found", 404));
  }
  return res
    .status(200)
    .json({ success: true, message: "Product deleted success" });
};

//get all products from db
//http://localhost:8000/api/v1/products?keyword=Coffee
export const getAllProducts = async (req, res) => {
  //const products = await Product.find();
  const apiHelper = new APIHelper(Product.find(), req.query).search().filter();
  const products = await apiHelper.query;
  res.status(200).json({
    success: true,
    products,
  });
};

//get single product from db
export const getSingleProduct = async (req, res, next) => {
  const id = await req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    //return res.status(500).json({ success: false, message: "Product not found" });
    return next(new errorHandler("Product not found", 404));
  }
  return res.status(200).json({ success: true, product });
};
