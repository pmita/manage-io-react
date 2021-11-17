import React, { useState } from 'react';
import './Signup.css';
//FIREBASE
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
    //STATE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);
    const { signup, isPending, error } = useSignup();

    //EVENTS
    const handleSubmit = (e) =>{
        e.preventDefault();
        signup(email, password, displayName, thumbnail);
    }

    const handleFileChange = (e) => {
        setThumbnail(null); // Reset State

        let selected = e.target.files[0]; // Returns an array of files, for this application we only expect 1 file
        console.log(selected);

        // Check the user has selected a file, that matches size and type limits
        if(!selected){
            setThumbnailError('Please select a file!');
            return;
        }

        if(!selected.type.includes('image')){
            setThumbnailError('Selected file must ne an image!');
            return;
        }

        if(!selected.size > 100000){
            setThumbnailError('Image file size must be less that 100kb');
            return;
        }

        setThumbnailError(null);
        setThumbnail(selected);
        console.log('Thumbnail updated');
    }
    return(
        <form onSubmit={handleSubmit} className='auth-form'>
            <h2>Sign up</h2>
            <label>
                <span>Email:</span>
                <input 
                    required
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input 
                    required
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>Display Name:</span>
                <input 
                    required
                    type='text'
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>Profile Thumbnail:</span>
                <input 
                    required
                    type='file'
                    onChange={handleFileChange}
                />
                {thumbnailError && <div className='error'>{thumbnailError}</div>}
            </label>
            {!isPending && <button className='btn'>Sign Up</button>}
            {isPending && <button className='btn' disabled>Loading...</button>}

            {error && <p className='error'>{error}</p>}
        </form>
    );
}

export default Signup;