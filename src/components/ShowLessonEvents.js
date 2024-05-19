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
            <h3 className="subtitle-style">En esta sección se encuentran las actividades a las que puede apuntar a sus niños. <br />Si está interesado/a, adjunte un archivo de autorización, seleccione el niño que desea inscribir y confirme su asistencia. </h3>
            {pantallas && <Pantallas pantallas={pantallas} />}
            {data && data.map((lessonEvent, index)=> (
                <LessonEventCard 
                    key={index} 
                    lessonEvent={lessonEvent}
                    kids ={kids[index]}
                    />
            ))}
        </LayoutProfiles>
    );
}

export default ShowType;