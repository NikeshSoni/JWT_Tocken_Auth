import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from 'react';
import axios from "axios"
import { CardTitle } from "@/components/ui/card";
import SaveIcon from "../Logo/heart-icon.png";
import IconHeart from "../Logo/save-heart.png"
import useGetUserId from "../hooks/useGetUserId.jsx"


const HeroSection = () => {
    const [cookies, _] = useCookies(["access_token"]);
    const [data, setData] = useState([]);
    const userId = useGetUserId();
    const [savedRecipes, setSavedRecipes] = useState([]);

    const onSubmitHandler = async () => {
        try {
            const responce = await axios.get("http://localhost:5001/recipes");
            setData(responce.data)
        } catch (error) {
            console.log(error)
        }
    }

    const SavedHandler = async () => {
        try {
            const responce = await axios.get(`http://localhost:5001/recipes/savedRecipe/ids/${userId}`);
            console.log(responce.data);
            setSavedRecipes(responce.data.savedRecipeIds)
        } catch (error) {
            console.log(error)
        }
    }

    const saveRecepi = async (recipeId) => {
        try {
            const response = await axios.put(
                "http://localhost:5001/recipes",
                { userId, recipeId },
            );

            console.log(response.data);
        } catch (error) {
            console.error("Error saving recipe:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        onSubmitHandler();
        SavedHandler()
    }, [])
    return (
        <>
            <div className='flex container mx-auto my-4 gap-7'>
                {data && data.map((items, idx) => {
                    return (
                        <div key={idx} className="w-[20%] my-3 p-3 border-gray-400 rounded-2xl shadow-md">
                            <div className="mt-2 font-medium flex items-center justify-between text-2xl">
                                <div>
                                    <h1>{items.name}</h1>
                                </div>

                                <div>
                                    {Array.isArray(savedRecipes) && savedRecipes.includes(items._id) ? (
                                        <img onClick={() => saveRecepi(items._id)} className="w-[1.2rem]" src={IconHeart} />
                                    ) : (
                                        <img onClick={() => saveRecepi(items._id)} className="w-[1.2rem]" src={SaveIcon} />
                                    )}
                                </div>
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
                                <CardTitle className="mb-2"> Instructions </CardTitle> {items.instructions}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default HeroSection
