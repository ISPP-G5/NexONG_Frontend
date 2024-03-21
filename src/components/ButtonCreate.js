import React from 'react';
import '../styles/styles.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const ButtonCreate = ({ text, handleCreate }) => {
    
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="button-create" onClick={handleCreate}>
                <AddCircleIcon className='add-circle' />
                <p>{text}</p>
            </button>
        </div>
    );
};

export default ButtonCreate;