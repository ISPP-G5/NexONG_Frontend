import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

function ActivityCard({ activities, kids}) {
  const [attendance, setAttendance] =  useState({});

  const handleAttendanceChange = (kidId) => {
    setAttendance(prevState => ({
      ...prevState,
      [kidId]: !prevState[kidId]
    }));
  };

  return (
    <div className='card-info'>
      <div className='activities-info'>
        <p>Nombre de actividad: {activities.name}</p>
      </div>
      {kids &&
      <div className='kids-info'>
        {kids.map((kid, kidIndex) => (
          <div className='kid' key={kidIndex}>
            <p>Nombre de niño: {kid.name} {kid.surname}</p>
            <p>Asistencia: 
              <Checkbox
                checked={attendance[kid.id] || false}
                onChange={() => handleAttendanceChange(kid.id)}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </p>
          </div>
        ))}
      </div>
      }


    </div>
  );
}

export default ActivityCard;
