import React, { useState } from 'react';
import '../styles/styles.css';


function ActivityCard({ activities, kids, exits }) {

  const [attendance, setAttendance] = useState({});
  const attendeeIds = activities.attendees || [];
  const attendees = kids.filter(kid => attendeeIds.includes(kid.id));
  const matchingExits = exits.filter(exit => exit.lesson_event === activities.id); 

  return (
    <div className='card-info-activity'>
      <div className='activity-info'>
        <h4>{activities.name}</h4>
      </div>

      {attendees.length > 0 && (
        <table className='kids-activity-info'>
          <thead>
            <tr className="attendance-header">
              <th>Asistentes autorizados</th>
              <th>Asistencia</th>
            </tr>
          </thead>

          <tbody>
          {attendees.map((kid, kidIndex) => {

            const exit = matchingExits.find(exit => exit.student === kid.id);
            const isAuthorized = exit ? exit.is_authorized : false;

            console.log(`Is Authorized for ${kid.name} ${kid.surname}: ${isAuthorized}`);

            return (
              <tr key={kidIndex}>
                <td>{kid.name} {kid.surname}</td>
                <td className="attendance-options">
                  <input
                    type="checkbox"
                    className={`activity-checkbox${attendance[kid.id] === 'YES' ? ' checked' : ''}`}
                    checked={isAuthorized}
                    
                  />
                  <p>Sí</p>
                  <input
                    type="checkbox"
                    className={`activity-checkbox${attendance[kid.id] === 'NO' ? ' checked' : ''}`}
                    checked={!isAuthorized}
                  />
                  <p>No</p>
                  </td>
                </tr>
            );
          })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ActivityCard;
