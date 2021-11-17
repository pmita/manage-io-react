import React from 'react';
import './Navbar.css';
//ASSETS
import Temple from '../assets/temple.svg';
//ROUTER
import { Link } from 'react-router-dom';
//HOOKS
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
    //STATE
    const { logout, isPending } = useLogout();

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
                    {!isPending && <button className='btn' onClick={logout}>Logout</button>}
                    {isPending && <button className='btn' disabled>Logging Out...</button>}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;