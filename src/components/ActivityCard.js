import React, { useState } from 'react';

function ActivityCard({ activities, kids, users }) {
  const [attendance, setAttendance] = useState({});
  const attendeeIds = activities.attendees || [];

  const attendees = kids.filter(kid => attendeeIds.includes(kid.id));

  const handleAttendanceChange = (kidId, value) => {
    setAttendance(prevState => ({
      ...prevState,
      [kidId]: prevState[kidId] === value ? null : value
    }));
  };

  return (
    <div className='card-info-activity'>
      <div className='activity-info'>
        <p>Nombre de actividad: {activities.name}</p>
      </div>

      {attendees.length > 0 && (
        <div className='kids-activity-info'>
          <div className="attendance-header">
            <p>Asistentes autorizados:</p>
            <p style={{ marginRight: '13%' }}>Asistencia</p> {/* Add margin-right */}
          </div>

          {attendees.map((kid, kidIndex) => (
            <div className='kids-activity' key={kidIndex}>
              <p>{kid.name} {kid.surname}</p>
              <div className="attendance-options">
                <div 
                  className={`activity-checkbox ${attendance[kid.id] === 'YES' ? 'checked' : ''}`}
                  onClick={() => handleAttendanceChange(kid.id, attendance[kid.id] === 'YES' ? null : 'YES')}
                />
                <p>Sí</p>
                <div 
                  className={`activity-checkbox ${attendance[kid.id] === 'NO' ? 'checked' : ''}`}
                  onClick={() => handleAttendanceChange(kid.id, attendance[kid.id] === 'NO' ? null : 'NO')}
                />
                <p>No</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActivityCard;
