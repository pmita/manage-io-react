import React, { useState } from 'react';
import './Dashboard.css';
//HOOKS
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
//COMPONENTS
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';

const Dashboard = () => {
    //STATE & VARIABLES
    const { user } = useAuthContext();
    const { documents, error } = useCollection('projects');
    const [currentFilter, setCurrentFilter] = useState('all');

    //EVENTS
    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter);
    }

    const projects = documents  
        ? documents.filter((document) => {
            switch(currentFilter){
                case 'all':
                    return true;
                case 'mine':
                    let assignedToMe = false
                    document.assignedUsersList.forEach(u => {
                        if(user.uid === user.id){
                            assignedToMe = true
                        }
                    })
                    return assignedToMe;
                case 'development':
                case 'design':
                case 'sales':
                case 'marketing':
                    console.log(document.category, currentFilter);
                    return document.category === currentFilter;
                default:
                    return true
            }
        })
        : null

    return(
        <div>
            <h2 className='page-title'>Dashboard</h2>
            {error && <p className='error'>{error}</p>}
            {documents && (
                <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />
            )}
            {documents && <ProjectList projects={projects} />}
        </div>
    );
}

export default Dashboard;