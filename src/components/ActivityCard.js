import React, { useState } from 'react';
import '../styles/styles.css';


function ActivityCard({ activities, kids, users, exits }) {
  const [attendance, setAttendance] = useState({});
  const attendeeIds = activities.attendees || [];

  const attendees = kids.filter(kid => attendeeIds.includes(kid.id));
  const matchingExits = exits.filter(exit => exit.lesson_event === activities.id); 

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

          {attendees.map((kid, kidIndex) => {

            const exit = matchingExits.find(exit => exit.student === kid.id);
            const isAuthorized = exit ? exit.is_authorized : false;

            console.log(`Is Authorized for ${kid.name} ${kid.surname}: ${isAuthorized}`);

            return (
              <div className='kids-activity' key={kidIndex}>
                <p>{kid.name} {kid.surname}</p>
                <div className="attendance-options">
                  <input
                    type="checkbox"
                    className={`activity-checkbox ${attendance[kid.id] === 'YES' ? 'checked' : ''}`}
                    checked={isAuthorized}
                    
                  />
                  <p>Sí</p>
                  <input
                    type="checkbox"
                    className={`activity-checkbox ${attendance[kid.id] === 'NO' ? 'checked' : ''}`}
                    checked={!isAuthorized}
                    
                  />
                  <p>No</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ActivityCard;
