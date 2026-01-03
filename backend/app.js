/*
const express=require(express);
const app=express();
module.exports=app;
*/

import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js"
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app=express();

//midleware
app.use(express.json());
app.use(cookieParser());


//routes
app.use("/api/v1/",product);
app.use("/api/v1/",user);


//always on bottom to avoid uncatched errors
app.use(errorHandler);

export default app;