import React, { useState, useEffect } from 'react';
import './Create.css';
//ASSETS
import Select from 'react-select';
//HOOKS
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
//FIREBASE
import { timestamp } from '../../firebase/config';
import { useFirestore } from '../../hooks/useFirestore';
//ROUTER
import { useNavigate } from 'react-router';

//CONSTANTS
const categories = [
    { value: 'develoment', label: 'Development'},
    { value: 'design', label: 'Design'},
    { value: 'sales', label: 'Sales'},
    { value: 'marketing', label: 'Marketing'},
]

const Create = () => {
    //STATE & VARIABLES
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { documents } = useCollection('users');
    const { addDocument, response } = useFirestore('projects');
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState(null);

    //EVENTS
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(name, details, dueDate, category, assignedUsers);
        setFormError(null);

        //check for details the users has submitted
        if(!category){
            setFormError('Please select a project category');
            return;
        }

        if(assignedUsers.length < 1){
            setFormError('Please assign the project to at least one user');
            return;
        }

        //add project to our firestore collection
        const createdBy = { //details for our project
            displayName : user.displayName,
            photURL : user.photoURL,
            id : user.uid
        }
        const assignedUsersList = assignedUsers.map(u => { //details for our project
            return { 
                displayName : u.value.displayName,
                photoURL : u.value.photoURL,
                id : u.value.id
            }
        })

        const project = {
            name : name,
            details : details,
            category : category.value,
            dueDate : timestamp.fromDate(new Date(dueDate)),
            comments : [],
            createdBy : createdBy,
            assignedUsersList : assignedUsersList
        }

        await addDocument(project);
        if(!response.error){
            navigate('/');
        }

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
                    <span>Assigned to: </span>
                    <Select
                        options={users}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>
                <button className='btn'>Add Project</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    );
}

export default Create;