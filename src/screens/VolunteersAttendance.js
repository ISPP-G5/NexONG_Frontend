import React, { useState } from 'react';
import '../styles/styles.css';

const events = [
    {
      name: 'Evento 1',
      date: '8/03/2024',
    },
    {
        name: 'Evento 2',
        date: '9/03/2024',
    },
    {
        name: 'Evento 3',
        date: '10/03/2024',
    },
  ];

function VolunteersAttendance() {
    const [eventsList, setEventsList] = useState(events);

  return (
    <div className='App'>
        <div>
            {eventsList.map((event, index) => (
            <div className='card-info-volunteer' key={index}>
            <div className='event-details'>
                <p>{event.name}</p>
                <p>{event.date}</p>
            </div>
        </div>
        ))}
    </div>
    </div>
  );
}

export default VolunteersAttendance;