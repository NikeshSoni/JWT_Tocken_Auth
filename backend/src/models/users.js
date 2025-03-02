import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
    },
    savedrecipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipes", // Ensure this matches the RecipesModel name
    }]
});

export const UserModel = mongoose.model("users", UserSchema); // Ensure the collection name matches
