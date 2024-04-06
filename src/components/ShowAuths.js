import React from 'react';
import '../styles/styles.css';
import AuthCard from './AuthCard';
import LayoutProfiles from './LayoutProfiles';
import Pantallas from './Pantallas';


function ShowType({ data, type, pantallas, nomStudent, nomEvent}) {

    return (
        <LayoutProfiles 
            profile={'familia'} 
            selected={type}
        >
            <h3 className="subtitle-style">En esta sección se muestran las autorizaciones previamente mandadas. <br />Se incluye el nombre del alumno que asistió, el nombre de la actividad, un link para descargar la autorización y la confirmación de su asistencia. </h3>
            {pantallas && <Pantallas pantallas={pantallas} />}
            {data && data.map((auth, index)=> (
                <AuthCard 
                    key={index} 
                    auth={auth}
                    nomStudent={nomStudent[index]}
                    nomEvent={nomEvent[index]}
                    />
            ))}
        </LayoutProfiles>
    );
}

export default ShowType;