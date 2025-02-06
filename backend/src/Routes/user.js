import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

// router.post("/register", async (req, res) => {
//   console.log("Received Body:", req.body); // Debugging
//   const { username, password } = req.body;

//   console.log(username , password , "username");

//   // if (!username || !password) {
//   //   return res.status(400).json({ message: "Missing username or password" });
//   // }

//   const user = await UserModel.findOne({ username });

//   console.log(user , "user");


//   // if (user) {
//   //   return res.status(400).json({ message: "Username already exists" });
//   // }
//   // const hashedPassword = await bcrypt.hash(password, 10);
//   // const newUser = new UserModel({ username, password: hashedPassword });
//   // await newUser.save();
//   // res.json({ message: "User registered successfully" });
//   res.json(user);
// });

router.post("/register", async (req, res) => {
  console.log("Received Body:", req.body);

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  // Hash Password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();  // ✅ Save user in MongoDB
  console.log("User Saved:", newUser);

  res.json({ message: "User registered successfully", user: newUser });
});



// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await UserModel.findOne({ username });

//   if (!user) {
//     return res
//       .status(400)
//       .json({ message: "Username or password is incorrect" });
//   }
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res
//       .status(400)
//       .json({ message: "Username or password is incorrect" });
//   }
//   const token = jwt.sign({ id: user._id }, "secret");
//   res.json({ token, userID: user._id });
// });

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