import axios from "axios";
import { useState, useEffect } from 'react';
import { Label } from "../components/ui/Label"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/Textarea"
import { Button } from "../components/ui/Button"
import useGetUserId from "../hooks/useGetUserId";
import { toast, Toaster } from "sonner";

// import { ToastAction } from "@/components/ui/toast"
// import { useToast } from "@/components/hooks/use-toast"

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
            // alert("User ID is missing. Please log in.");
            toast.error("User ID is missing. Please log in.");

            return;
        }

        try {
            await axios.post("http://localhost:5001/recipes", recipe);
            console.log(useUserId);
            alert("Recipe Created");
            setRecipe({
                name: "",
                description: "",
                ingredients: [],
                instructions: "",
                imageUrl: "",
                cookingTime: 0,
                userOwner: useUserId, // Keep user ID
            });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=''>
            <Toaster richColors position="top-right" />

            <div className='w-[50%] mx-auto text-start mt-4'>
                <h1 className='text-[22px]'>Create Recipe</h1>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className='w-[50%] mx-auto'>
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
                        <Label htmlFor="Instructions">instructions</Label>
                        <Textarea className='my-2' id="instructions"
                            type="text"
                            name="instructions"
                            placeholder="instructions"
                            onChange={handleChange}
                            value={recipe.instructions} required />
                    </div>

                    <div>
                        <Label htmlFor="img_url">Img Url</Label>
                        <Input className='my-2' id="img_url"
                            type="text" onChange={handleChange}
                            // value={recipe.imageUrl}
                            name="imageUrl" required />
                    </div>
                    <div>
                        <Label htmlFor="cookingTime">Cooking time (minutes)</Label>
                        <Input className='my-2' id="cookingTime"
                            type="number" placeholder="cookingTime"
                            onChange={handleChange}
                            name="cookingTime"
                            // value={recipe.cookingTime} 
                            required
                        />
                    </div>

                    <Button type="submit">submit</Button>

                </div>

            </form>
        </div>
    )
}

export default CreateRecipe;