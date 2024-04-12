import React from 'react';
import '../styles/styles.css';
import EvalCard from './EvalCard';
import LayoutProfiles from './LayoutProfiles';
import Pantallas from './Pantallas';


function ShowType({ data, type, pantallas, gradeTypes, student}) {
    return (
        <LayoutProfiles 
            profile={'familia'} 
            selected={type}
        >
            <h3 className="subtitle-style">En esta sección se muestran las evaluaciones diarias recibidas. <br />Están clasificadas por niño evaluado</h3>
            {pantallas && <Pantallas pantallas={pantallas} />}
            {data && data.map((evaluat, index)=> (
                <EvalCard 
                    key={index}
                    evaluat={evaluat}
                    gradeTypes={gradeTypes[index]}
                    student = {student}
                    />
            ))}
        </LayoutProfiles>
    );
}

export default ShowType;