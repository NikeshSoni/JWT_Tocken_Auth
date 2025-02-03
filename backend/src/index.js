
// in the packeg json  useing  "type": "module",  thats 
//  why the allow to use import 

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// const express = require("express");


const app = express();

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost:27017/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
  

app.listen(PORT, () => {
    console.log(`code is running ${PORT}`);
})