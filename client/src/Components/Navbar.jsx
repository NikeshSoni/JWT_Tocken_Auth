import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../Logo/logo.webp";
import { Auth } from '../Pages/Auth';


const Navbar = () => {


    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <header className="w-auto bg-white text-dark">
                <navbar className="flex w-[90%] mx-auto items-center p-3 justify-between">
                    <div className='logo'>
                        <img src={Logo} className='w-[5%] h-[5%] rounded-[50%]' />
                    </div>
                    <ul className='flex w-[60%] items-center justify-center'>
                        <li className='ml-3.5'><Link className='' to="/">Home</Link></li>
                        {/* <li className='ml-3.5'><Link to="/auth">Auth</Link></li> */}
                        <li className='ml-3.5'><Link to="/createrecipe">createrecipe</Link></li>
                        <li className='ml-3.5'><Link to="/savedrecipe">savedrecipe</Link></li>

                        <div className='ml-4.5'>
                            <button
                                onClick={openModal}
                                className="px-6 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-700"
                            >
                                
                                <Auth
                                    isModalOpen={isModalOpen}
                                    closeModal={closeModal}
                                    openModal={openModal} />
                                Register
                            </button>
                        </div>
                    </ul>
                </navbar>
            </header>



        </div>
    )
}

export default Navbar;