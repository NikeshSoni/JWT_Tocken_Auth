import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => {
  console.log("Received Body:", req.body); // Debugging
  const { username, password } = req.body;

  console.log(username , password , "username");

  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }
  const user = await UserModel.findOne({ username });

  console.log(user , "user");


  //  identify the user before createing  new user 
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }

  //  hash the password 
  const passwordHandler = await bcrypt.hash(password, 10);

  //  createting new user 
  const userHandler = new UserModel({ username, password: passwordHandler });
  await userHandler.save();
  res.json({ message: "User registered successfully" });

  res.json(userHandler);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
 
  if (!user){
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }


  // password  detector 
  const PasswordValidation = await bcrypt.compare(password, user.password);

  // password handler 
  if (!PasswordValidation) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }

  const tokenChecker = jwt.sign({ id: user._id }, "secret");

  res.json({ tokenChecker, userID: user._id });
});

export { router as userRouter };

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     jwt.verify(authHeader, "secret", (err) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };