import React from 'react';
import '../styles/styles.css';
import ChildrenCard from './ChildrenCard';
import LayoutProfiles from './LayoutProfiles';
import ButtonCreate from './ButtonCreate';
import { useNavigate } from 'react-router-dom';

function ShowType({ data, type }) {   
    
    const navigate = useNavigate();

    const handleButton = () => {
        navigate('/familia/niños/registro');
    };

    return (
        <LayoutProfiles 
            profile={'familia'} 
            selected={type}
        >
            <div className='button-container'>
                <ButtonCreate className='button-contrast' text='Añadir niño' handleCreate={handleButton} withIcon={true} />
            </div>

            {data && data.map((child, index)=> (
                <ChildrenCard key={index} child={child} />
            ))}
        </LayoutProfiles>
    );
}

export default ShowType;