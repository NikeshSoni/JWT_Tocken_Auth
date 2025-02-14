
// in the packeg json  useing  "type": "module",  thats 
//  why the allow to use import 

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from './Routes/user.js'


const app = express();

app.use(express.json())
app.use(cors())
app.use("/auth" , userRouter)

const PORT = process.env.PORT || 5001
;

mongoose.connect("mongodb://127.0.0.1:27017/Recipe", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.listen(PORT, () => {
  console.log(`code is running ${PORT}`);
})  