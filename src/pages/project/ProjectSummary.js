import React from 'react';
//COMPONENTS
import Avatar from '../../components/Avatar';
//HOOKS
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
//ROUTER
import { useNavigate } from 'react-router';

const ProjectSummary = ({ project }) => {
    //STATE
    const { deleteDocument } = useFirestore('projects');
    const { user } = useAuthContext();
    const navigate = useNavigate();

    //EVENTS
    const handleClick = (e) => {
        deleteDocument(project.id);
        navigate('/');
    }

    return(
        <div>
            <div className='project-summary'>
                <h2 className='page-title'>{project.name}</h2>
                <p>By {project.createdBy.displayName}</p>
                <p className='due-date'>
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className='details'>
                    <h4>Project is assigned to:</h4>
                    <div className='assigned-users'>
                        {project.assignedUsersList.map(user => (
                            <div key={user.id}>
                                <Avatar src={user.photoURL} />
                            </div>
                        ))}
                    </div>
                </p>
            </div>
            {user.uid === project.createdBy.id && (
                <button className='btn' onClick={handleClick}>Mark as Complete</button>
            )}
        </div>
    );
}

export default ProjectSummary;