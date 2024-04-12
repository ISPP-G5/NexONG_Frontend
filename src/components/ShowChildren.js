import React from 'react';
import '../styles/styles.css';
import ChildrenCard from './ChildrenCard';
import LayoutProfiles from './LayoutProfiles';


function ShowType({ data, type }) {
    const handleAddChild = () => {
        console.log("Registrar")
    };
    
    return (
        <LayoutProfiles 
            profile={'familia'} 
            selected={type}
        >
            <button 
                className='button-contrast' 
                style={{padding:'5px', width:'100px', margin:0}}
                onClick={handleAddChild}> 
                Registar un hijo
            </button>

            {data && data.map((child, index)=> (
                <ChildrenCard key={index} child={child} />
            ))}
        </LayoutProfiles>
    );
}

export default ShowType;