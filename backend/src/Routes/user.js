import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const passwordHandler = await bcrypt.hash(password, 10);
  const userHandler = new UserModel({ username, password: passwordHandler });
  await userHandler.save();
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }

  const PasswordValidation = await bcrypt.compare(password, user.password);
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

//   if (!authHeader) {
//     return res.status(401).json({ message: "Access token missing" });
//   }

//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, "secret", (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid or expired token" });
//     }
//     req.user = decoded;
//     next();
//   });
// };


// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "Access token missing" });
//   }

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