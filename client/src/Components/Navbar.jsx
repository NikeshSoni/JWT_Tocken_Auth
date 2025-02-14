import { useState } from 'react';
import { Link } from "react-router-dom";
import { Auth } from '../Pages/Auth';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                    {!isAuthenticated ? (
                        <button onClick={openModal} className="px-6 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-700">
                            Register / Login
                        </button>
                    ) : (
                        <button onClick={() => setIsAuthenticated(false)} className="px-6 py-2 bg-red-400 text-white rounded-md hover:bg-red-700">
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
