import Product from "../models/productModel.js";

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
export const updateProduct = async (req, res) => {
  const id = await req.params.id;
  let product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }
  return res.status(200).json({ success: true, product });
};

//delete product
export const deleteProduct = async (req,res) => {
  const id = await req.params.id;
  let product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Product deleted success" });
};

//get all products from db
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

//get single product from db
export const getSingleProduct = async (req, res) => {
  const id = await req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }
  return res.status(200).json({ success: true, product });
};
