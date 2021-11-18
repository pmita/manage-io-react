import React from 'react';
import './Sidebar.css';
//ASSETS
import Dashboard from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
//ROUTER
import { NavLink } from 'react-router-dom';
//COMPONENTS
import Avatar from './Avatar';
//HOOKS
import { useAuthContext } from '../hooks/useAuthContext';

const Sidebar = () => {
    //STATE
    const { user } = useAuthContext();

    return(
        <div className='sidebar'>
            <div className='sidebar-content'>
                <div className='user'>
                    <Avatar src={user.photoURL} />
                    <p>Hey {user.displayName}</p>
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink exact to='/'>
                                <img src={Dashboard} alt='home page icon in black and white' />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={AddIcon} alt='add project icon in black and white' />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;