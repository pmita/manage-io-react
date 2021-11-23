import React from 'react';
//COMPONENTS
import Avatar from '../../components/Avatar';

const ProjectSummary = ({ project }) => {
    return(
        <div>
            <div className='project-summary'>
                <h2 className='page-title'>{project.name}</h2>
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
        </div>
    );
}

export default ProjectSummary;