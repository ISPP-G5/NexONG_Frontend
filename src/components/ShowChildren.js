import React from 'react';
import '../styles/styles.css';
import ChildrenCard from './ChildrenCard';
import LayoutProfiles from './LayoutProfiles';


function ShowType({ data, type }) {    
    return (
        <LayoutProfiles 
            profile={'familia'} 
            selected={type}
        >
            <a 
                href={'/familia/niños/registro'} 
                className='button-contrast' 
                style={{padding:'5px', width:'100px', margin:0, textDecoration: 'none'}}
            >
            Registrar un hijo
            </a>

            {data && data.map((child, index)=> (
                <ChildrenCard key={index} child={child} />
            ))}
        </LayoutProfiles>
    );
}

export default ShowType;