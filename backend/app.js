/*
const express=require(express);
const app=express();
module.exports=app;
*/

import express from "express";
import product from "./routes/productRoutes.js";
import errorHandler from "./middleware/error.js";

const app=express();

//midleware
app.use(express.json());


//routes
app.use("/api/v1/",product);


//always on bottom to avoid uncatched errors
app.use(errorHandler);

export default app;