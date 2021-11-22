import React, { useState, useEffect } from 'react';
import './Create.css';
//ASSETS
import Select from 'react-select';
//HOOKS
import { useCollection } from '../../hooks/useCollection';

//CONSTANTS
const categories = [
    { value: 'develoment', label: 'Development'},
    { value: 'design', label: 'Design'},
    { value: 'sales', label: 'Sales'},
    { value: 'marketing', label: 'Marketing'},
]

const Create = () => {
    //STATE & VARIABLES
    const { documents } = useCollection('users');
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);

    //EVENTS
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(name, details, dueDate, category, assignedUsers);
    }

    //useEFFECT
    useEffect(() => {
        if(documents){
            const userUpdated = documents.map(user => {
                return { value: user, label: user.displayName}
            });
            setUsers(userUpdated);
        }
    }, [documents]);

    return(
        <div className='create-form'>
            <h2 className='page-title'>Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name: </span>
                    <input
                        required
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details: </span>
                    <textarea
                        required
                        type='text'
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Set Due Date: </span>
                    <input
                        required
                        type='date'
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project Category: </span>
                    <Select 
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>
                <label>
                    <span>Assigne to: </span>
                    <Select
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>
                <button className='btn'>Add Project</button>
            </form>
        </div>
    );
}

export default Create;