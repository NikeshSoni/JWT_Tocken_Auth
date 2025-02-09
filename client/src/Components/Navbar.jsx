import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <h1 className='bg-blue-500text-4xl font-bold text-blue-500'>
                Hiii 
            </h1>
            <Link className='gap-5' to="/">Home</Link>
            <Link to="/auth">Auth</Link>
            <Link to="/createrecipe">createrecipe</Link>
            <Link to="/savedrecipe">savedrecipe</Link>
        </div>
    )
}

export default Navbar;