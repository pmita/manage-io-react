import React from 'react';
import './Navbar.css';
//ASSETS
import Temple from '../assets/temple.svg';
//ROUTER
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt='brand logo in black and white' />
                    <span>The Dojo</span>
                </li>

                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/signup'>Signup</Link>
                </li>
                <li>
                    <button className='btn'>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;