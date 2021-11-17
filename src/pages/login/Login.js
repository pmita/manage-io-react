import React, { useState } from 'react';
import './Login.css';
//HOOKS
import { useLogin } from '../../hooks/useLogin';

const Login = () => {
//STATE
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { error, isPending, login } = useLogin();

//EVENTS
const handleSubmit = (e) =>{
    e.preventDefault();
    login(email, password);
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
        {!isPending && <button className='btn'>Login</button>}
        {isPending && <button className='btn' disabled>Loading...</button>}

{error && <p className='error'>{error}</p>}
    </form>
);
}

export default Login;