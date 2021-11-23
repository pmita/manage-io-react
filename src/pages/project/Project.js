import React from 'react';
import './Project.css';
//ROUTER
import { useParams } from 'react-router';
import { useDocument } from '../../hooks/useDocument';
//COMPONENTS
import ProjectSummary from '../../pages/project/ProjectSummary';
import ProjectComments from './ProjectComments';

const Project = () => {
    //STATE & VARIABLES
    const { id } = useParams();
    const { document, error } = useDocument('projects', id);

    if(error){
        return <div className='error'>{error}</div>
    }

    if(!document){
        return <div className='loading'>Loading...</div>
    }

    return(
        <div className='project-details'>
            <ProjectSummary project={document} />
            <ProjectComments project={document} />
        </div>
    );
}

export default Project;