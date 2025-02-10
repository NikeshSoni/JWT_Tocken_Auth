import React from 'react';
import Hero from "../Logo/hero-img.png"

const HeroSection = () => {
    return (
        <div className="bg-gray-100 w-full flex align-center flex-col md:flex-row h-[80vh]">
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
        </div>
    )
}

export default HeroSection
