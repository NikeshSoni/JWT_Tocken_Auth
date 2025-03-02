import React, { useEffect, useState } from 'react';
import axios from "axios"
import { CardTitle } from "@/components/ui/card";
import useGetUserId from "../hooks/useGetUserId.jsx"

const SavedRecipe = () => {
    const userId = useGetUserId();
    const [savedRecipes, setSavedRecipes] = useState([]);

    const SavedHandler = async (event) => {
        try {
            const responce = await axios.get(`http://localhost:5001/recipes/savedRecipe/${userId}`);
            console.log(responce.data);
            setSavedRecipes(responce.data.savedRecipeIds)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        SavedHandler()
    }, [])
    return (
        <>
            <div className='text-center mt-5'>
                <h1 className='text-3xl'>Saved Recipe</h1>
            </div>
            <div className='flex container mx-auto my-4 gap-7'>
                {savedRecipes && savedRecipes.map((items, idx) => {
                    return (
                        <div key={idx} className="w-[20%] my-3 p-3 border-gray-400 rounded-2xl shadow-md">
                            <div className="mt-2 font-medium flex items-center justify-between text-2xl">
                                <h1>{items.name}</h1>
                            </div>

                            <div className='text-center my-3'>
                                <img className='w-[60%] mx-auto' src={items.imageUrl} />
                            </div>

                            <div>
                                <ul>
                                    <CardTitle className="mb-2"> Ingredients </CardTitle>
                                </ul>
                                {items.ingredients.map((items, idx) => {
                                    return <li key={idx} className='ml-4'> {items} </li>
                                })}
                            </div>

                            <div>
                                <CardTitle className="mb-2"> Instructions </CardTitle>
                                {items.instructions}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default SavedRecipe
