import React from 'react';
import '../styles/styles.css';
import PersonCard from './PersonCard';
import LayoutProfiles from './LayoutProfiles';
import Pantallas from './Pantallas';

function ShowType({ data, type, pantallas, kids, request = false, trash = true, message }) {
     
    return (
        <LayoutProfiles 
            profile={'admin'} 
            selected={type}
        >
            {pantallas && <Pantallas pantallas={pantallas} />}

            {data.length > 0 ? (
                data.map((p, index) => (
                    <PersonCard 
                        key={index} 
                        person={p} 
                        personType={type}
                        kids={kids}
                        request={request} 
                        trash={trash}
                    />
                ))
            ) : (
                <div className= "centered-message">
                <p>{message}</p>
                </div>
            )}
        </LayoutProfiles>
    );
}

export default ShowType;