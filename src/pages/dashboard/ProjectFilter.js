import React from 'react';

//VARIABLES
const filtersList = ['all', 'mine', 'development', 'design', 'marketing', 'sales'];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
    //EVENTS
    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }
    return(
        <div className='project-filter'>
            <nav>
                <p>Filter by:</p>
                {filtersList.map(f => (
                    <button 
                        key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? `active` : ``}
                    >
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default ProjectFilter;