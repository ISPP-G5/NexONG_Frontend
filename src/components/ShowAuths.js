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