import axios from "axios";
import { useState, useEffect } from 'react';
import { Label } from "../components/ui/Label"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/Textarea"
import { Button } from "../components/ui/Button"
import useGetUserId from "../hooks/useGetUserId";
import { toast, Toaster } from "sonner";

const CreateRecipe = () => {

    const useUserId = useGetUserId()

    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: null,
    });

    useEffect(() => {
        if (useUserId) {
            setRecipe((prev) => ({ ...prev, userOwner: useUserId }));
        }
    }, [useUserId]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value })
    }

    const handleIngredientsChange = (event, idx) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients })
    }
    const addIngredients = () => {
        const ingredients = [...recipe.ingredients, ""];
        setRecipe({ ...recipe, ingredients });
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!recipe.userOwner) {
            toast.error("User ID is missing. Please log in.");
            return;
        }

        try {
            await axios.post("http://localhost:5001/recipes", recipe);

            // ✅ Show success notification
            toast.success("Recipe Created Successfully!", {
                duration: 2000, // 3 seconds
                style: {
                    background: "#4ade80", // Green background
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "16px",
                    padding: "10px 15px",
                    marginTop: "30px"
                },
            });

            // ✅ Reset form fields
            setRecipe({
                name: "",
                description: "",
                ingredients: [],
                instructions: "",
                imageUrl: "",
                cookingTime: 0,
                userOwner: useUserId,
            });

        } catch (error) {
            // console.error(error);
            toast.error("Failed to create recipe. Please try again!", { duration: 1000, });
        }
    };

    return (
        <div className=''>
            <Toaster richColors position="top-left" />
            {/* <Toaster richColors position="top-left" /> */}


            <form onSubmit={onSubmitHandler}>

                <div className='w-[50%] mx-auto p-4 shadow-lg'>

                    <div className='w-[50%] text-start mt-4'>
                        <h1 className='text-[22px]'>Create Recipe</h1>
                    </div>
                    <div className="">
                        <Label htmlFor="Neme" >Neme</Label>
                        <Input id="name" className='my-2'
                            type="text"
                            name="name"
                            value={recipe.name}
                            placeholder="Name"
                            onChange={handleChange}
                            required />
                    </div>
                    <div>
                        <Label htmlFor="Ingredients">Ingredients</Label>
                        <div className='my-3'>
                            <Button onClick={addIngredients} type="button">Add Ingredients</Button>
                            {recipe.ingredients.map((ingredient, index) => (
                                <Input
                                    key={index}
                                    className="my-2"
                                    type="text"
                                    name="ingredients"
                                    placeholder="ingredients"
                                    value={ingredient}
                                    onChange={(event) => handleIngredientsChange(event, index)}
                                    required
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="Instructions">Instructions</Label>
                        <Textarea className='my-2' id="instructions"
                            type="text"
                            name="instructions"
                            placeholder="instructions"
                            onChange={handleChange}
                            value={recipe.instructions} required />
                    </div>

                    <div>
                        <Label htmlFor="imageUrl">Img Url</Label>
                        <Input className='my-2' id="imageUrl"
                            type="text"
                            name="imageUrl"
                            value={recipe.imageUrl} // ✅ Ensure this is set
                            onChange={handleChange}
                            required />
                    </div>
                    <div>
                        <Label htmlFor="cookingTime">Cooking time (minutes)</Label>
                        <Input className='my-2' id="cookingTime"
                            type="number"
                            name="cookingTime"
                            value={recipe.cookingTime} // ✅ Ensure this is set
                            onChange={handleChange}
                            required />
                    </div>

                    <Button type="submit">submit</Button>

                </div>

            </form>
        </div>
    )
}

export default CreateRecipe;