import express from "express";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js"

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(err);
  }
})

router.post("/" , async (req, res) => {

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
    const recipe = await RecipesModel.findById(req.body.recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const user = await UserModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.savedrecipes = user.savedrecipes || [];
    if (!user.savedrecipes.includes(recipe._id)) {
      user.savedrecipes.push(recipe._id);
      await user.save();
    }

    res.json({ savedRecipes: user.savedrecipes });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/savedRecipe/ids/:userId", async (req, res) => {
  try {
    console.log(req.params, "Received Params");

    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ savedRecipeIds: user.savedrecipes });
  } catch (err) {
    console.error("Error fetching saved recipes:", err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
});

router.get("/savedRecipe/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId).populate("savedrecipes");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ savedRecipeIds: user.savedrecipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as recipesRouter };
