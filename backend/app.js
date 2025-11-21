/*
const express=require(express);
const app=express();
module.exports=app;
*/

import express from "express";
import product from "./routes/productRoutes.js";

const app=express();

app.use("/api/v1/",product);

export default app;