import React from 'react';
import '../styles/styles.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const ButtonCreate = ({ text, handleCreate, withIcon }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' , marginLeft: '20px'}}>
      <button className="button-create" onClick={handleCreate}>
        {withIcon && <AddCircleIcon className='add-circle' />}
        <p>{text}</p>
      </button>
    </div>
  );
};

export default ButtonCreate;
