import React, { useEffect, useState } from 'react';
import axios from "axios"
import Hero from "../Logo/hero-img.png"
import {
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const HeroSection = () => {
    const [data, setData] = useState([])
    const onSubmitHandler = async (event) => {

        try {
            const responce = await axios.get("http://localhost:5001/recipes");
            console.log(responce.data);

            setData(responce.data)
            // alert("Recipe Created")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        onSubmitHandler();
    }, [])


    const handleModel = (items, idx) => {
        return (
            <>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input id="username" value="@peduarte" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </>
        )
    }


    return (
        <>
            {/* <div className="bg-gray-100 w-full flex align-center flex-col md:flex-row h-[80vh]">
                <div className="w-full flex items-center md:w-1/2 p-4">
                    <div className='p-4'>
                        <h3 className="text-2xl md:text-4xl font-mono">Make Your won Recepe</h3>
                        <h2 className="text-2xl md:text-4xl font-mono">Be Heppy</h2>
                        <p className='mb-2'><span className='font-semibold'>Create personalized dishes,</span> enjoy cooking, and share happiness through food.</p>
                        <button className="bg-blue-500 mt-2 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                            Make it
                        </button>

                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
                    <img className="w-[70%] h-[70%] animated-up-down" src={Hero} alt="Hero" />
                </div>
            </div> */}
            <div className='flex w-[80%] mx-auto my-4'>
                {data && data.map((items, idx) => {
                    return (
                        <>
                            <div onClick={() => handleModel(items, idx)} key={idx} className="w-[20%] my-3 p-3 shadow-md">
                                <div className='text-center'>
                                    <img className='w-[80%] mx-auto' src={items.imageUrl} />
                                </div>
                                <div className="mt-2">
                                    <CardTitle>Dish Name : {items.name}</CardTitle>
                                </div>
                                {/* <div className=''>
                                <ul>
                                    <CardTitle className="mb-2"> Ingredients </CardTitle>
                                </ul>
                                {items.ingredients.map((items) => {
                                    return <li className='ml-4'> {items} </li>
                                })}
                            </div>

                            <div>
                                <p>Instructions: {items.instructions}</p>
                            </div> */}
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default HeroSection
