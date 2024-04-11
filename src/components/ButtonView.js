import React from 'react';
import '../styles/styles.css';

const ButtonCreate = ({ text, handleCreate }) => {
    
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' , marginLeft: '20px'}}>
            <button className="button-create" onClick={handleCreate}>
                <p>{text}</p>
            </button>
        </div>
    );
};

export default ButtonCreate;