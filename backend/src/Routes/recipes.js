import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
// import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(err);
  }
})

router.post("/", async (req, res) => {

  const recipe = new RecipesModel(req.body)
  try {
    const responce = await recipe.save()
    res.json(responce)
  } catch (error) {
    res.status(500).json(err);
  }
})

router.put("/", async (req, res) => {
  try {
    const recipe = new RecipesModel.findById(req.body.recipeId);
    const user = new UserModel.findById(req.body.userId);
    user.savedRecipe.push(recipe);
    await user.save()

    res.json({ savedRecipe: user.savedRecipe })
  } catch (error) {
    res.status(500).json(err);
  }
})

router.get("/savedRecipe/ids", async (req, res) => {
  try {
    const user = await RecipesModel.findById(req.params.recipeId);
    await RecipesModel.find({_id: { $id: user.savedRecipe }})
    res.status(200).json({ savedRecipe: user.savedRecipe });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/savedRecipe", async (req, res) => {
  try {
    const result = await RecipesModel.findById(req.params?.userId);
    res.status(200).json({ savedRecipe });
  } catch (err) {
    res.status(500).json(err);
  }
});
export { router as recipesRouter };
