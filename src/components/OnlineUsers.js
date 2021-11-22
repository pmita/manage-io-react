import React from 'react';
import './OnlineUsers.css';
//HOOKS
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';

const OnlineUsers = () => {
    //STATE
    const { error, documents } = useCollection('users');

    return(
        <div className='user-list'>
            <h2>All Users</h2>
            {error && <p className='error'>{error}</p>}
            {documents && documents.map(user => (
                <div className='user-list-item' key={user.id}>
                    {user.online && <span className='online-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
        </div>
    );
}

export default OnlineUsers;
