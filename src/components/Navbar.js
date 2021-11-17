import React from 'react';
import './Navbar.css';
//ASSETS
import Temple from '../assets/temple.svg';
//ROUTER
import { Link } from 'react-router-dom';
//HOOKS
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    //STATE
    const { logout, isPending } = useLogout();
    const { user } = useAuthContext();

    return(
        <nav className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt='brand logo in black and white' />
                    <span>The Dojo</span>
                </li>

                {!user && (
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </>
                )}

                {user && (
                    <li>
                        {!isPending && <button className='btn' onClick={logout}>Logout</button>}
                        {isPending && <button className='btn' disabled>Logging Out...</button>}
                    </li>
                )}

            </ul>
        </nav>
    );
}

export default Navbar;