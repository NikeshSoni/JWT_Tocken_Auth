import { useState } from 'react';
import { Link } from "react-router-dom";
import { Auth } from '../Pages/Auth';
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie"


const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [cookies, setCookies] = useCookies(["access_token"])


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <header className="w-auto bg-white text-dark shadow-lg shadow-gray-900/10">
            <nav className="flex w-[90%] mx-auto items-center p-3 justify-between">
                <ul className='flex w-[60%]'>
                    <li className='ml-3.5'><Link to="/">Home</Link></li>
                    <li className='ml-3.5'><Link to="/createrecipe">Create Recipe</Link></li>
                    <li className='ml-3.5'><Link to="/savedrecipe">Saved Recipe</Link></li>
                </ul>

                <div>
                    {/* {!isAuthenticated ? (
                        <Button className="bg-blue-400" onClick={openModal}>
                            <Link href="/login">Register</Link>
                        </Button>
                    ) : (
                        <button onClick={openModal} className="px-6 py-2 bg-red-400 text-white rounded-md hover:bg-red-700">
                            Logout
                        </button>
                    )} */}
                    
                    {!cookies.access_token ? (
                        <Button className="bg-blue-400" onClick={openModal}>
                            <Link href="/login">Login/Register</Link>
                        </Button>
                    ) : (
                        <button onClick={openModal} className="px-6 py-2 bg-red-400 text-white rounded-md hover:bg-red-700">
                            Logout
                        </button>
                    )}
                </div>
            </nav>

            <Auth isModalOpen={isModalOpen} closeModal={closeModal} setIsAuthenticated={setIsAuthenticated} />
        </header>
    );
};

export default Navbar;
