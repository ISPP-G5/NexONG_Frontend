// StudentCard.js
import React, { useEffect } from 'react';

const StudentCard = ({ familyName, kidName, currentEducationYear, evaluation, onEvaluationChange, onSubmit, onEdit , onInfo}) => {
  useEffect(() => {
    console.log('evaluation prop changed:', evaluation);
  }, [evaluation]);

  return (
    <div className='card-info'>
      <div className='family-request'>
        <img src='https://images.hola.com/images/027f-178e051fb317-8ce95081f1b5-1000/horizontal-1200/padre-e-hijo.jpg' alt='placeholder' />
        <div className='family-info'>
          <p>{familyName}</p>
          <p>{kidName}</p>
          <p>{currentEducationYear}</p>
          <p>Última evaluación: {evaluation}</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
       
        <button className="edit-button" onClick={onEdit}>Evaluar</button>
        <button className="bottom-right-button " onClick={onInfo}>Contactar</button>


      </div>
    </div>
  );
};

export default StudentCard;