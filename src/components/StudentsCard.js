import React, { useEffect } from 'react';

const StudentCard = ({ familyName, kidName, currentEducationYear, evaluation, onEdit, onInfo,onEvaluacion2,lesson }) => {
  useEffect(() => {
    console.log('evaluation prop changed:', evaluation);
  }, [evaluation]);

  return (
    <div className='card-info'>
      <div className='family-request'>
        <img src='https://images.hola.com/images/027f-178e051fb317-8ce95081f1b5-1000/horizontal-1200/padre-e-hijo.jpg' alt='placeholder' />
        <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none' }}>
          <p>Family Name: {familyName}</p>
          <p>Kid Name: {kidName}</p>
          <p>Lesson: {lesson}</p>
          <p>Current Education Year: {currentEducationYear}</p>
  
        </div>
      </div>
      <div className='buttons-requests'>
        <button className="button-contrast" onClick={onEdit}>Evaluar</button>
        <button className="button-contrast" onClick={onEvaluacion2}>Evaluaciones</button>
        <button className="button-contrast" onClick={onInfo}>Contactar</button>
      </div>
    </div>
  );
};

export default StudentCard;
