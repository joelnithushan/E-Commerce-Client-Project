import Product from "../models/productModel.js";

//create products

export const addProducts=async(req,res)=>{
    //console.log(res.body);
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product,
    });

};

export const getAllProducts=(req,res)=>{
    res.status(200).json({message:"All Products"});
};

export const getSingleProduct=(req,res)=>{
    res.status(200).json({message:"Single Product"});
};