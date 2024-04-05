import React from 'react';
import '../styles/styles.css';
import LessonEventCard from './LessonEventCard';
import LayoutProfiles from './LayoutProfiles';
import Pantallas from './Pantallas';


function ShowType({ data, type, pantallas, kids}) {
    return (
        <LayoutProfiles 
            profile={'familia'} 
            selected={type}
        >
            {pantallas && <Pantallas pantallas={pantallas} />}
            {data && data.map((lessonEvent, index)=> (
                <LessonEventCard 
                    key={index} 
                    lessonEvent={lessonEvent}
                    kids ={kids}
                    />
            ))}
        </LayoutProfiles>
    );
}

export default ShowType;