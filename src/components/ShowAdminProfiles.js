import React from 'react';
import '../styles/styles.css';
import PersonCard from './PersonCard';
import LayoutProfiles from './LayoutProfiles';
import Pantallas from './Pantallas';

function ShowType({ data, type, pantallas, download = false, kids, request = false, trash = true, message }) {
     
    return (
        <LayoutProfiles 
            profile={'admin'} 
            selected={type}
        >
            {pantallas && <Pantallas pantallas={pantallas} />}

            {download &&
            <div>
                <select className="button-download" onChange={(e) => download(e.target.value)}>
                    <option value=""> Descargar socios en</option>
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                </select>
            </div>}

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
                <p className='no-info'>{message}</p>
            )}
        </LayoutProfiles>
    );
}

export default ShowType;