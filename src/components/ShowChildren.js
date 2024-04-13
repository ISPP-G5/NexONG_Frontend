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
                className='button' 
                style={{
                    padding:'10px 25px', 
                    width:'100px', 
                    margin:'0px', 
                    textDecoration: 'none', 
                    marginRight: '20%',
                    color: "black",
                }}
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