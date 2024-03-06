import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Header from '../components/Header';
import Footer from '../components/Footer';

const localizer = momentLocalizer(moment);

const activities = [
    {
        id: 2,
        title: 'Activity 0',
        start: new Date(2024, 2, 2, 14, 0),
        end: new Date(2024, 2, 2, 16, 0),
    },
    {
      id: 1,
      title: 'Activity 1',
      start: new Date(2024, 2, 1, 10, 0), 
      end: new Date(2024, 2, 1, 12, 0),
    },
    {
      id: 2,
      title: 'Activity 2',
      start: new Date(2024, 2, 2, 14, 0),
      end: new Date(2024, 2, 2, 16, 0),
    },
    {
      id: 3,
      title: 'Activity 3',
      start: new Date(2024, 2, 3, 9, 0), 
      end: new Date(2024, 2, 3, 11, 0),
    },
    {
      id: 4,
      title: 'Activity 4',
      start: new Date(2024, 2, 4, 13, 0), 
      end: new Date(2024, 2, 4, 15, 0),
    },
    {
      id: 5,
      title: 'Activity 5',
      start: new Date(2024, 2, 5, 11, 0), 
      end: new Date(2024, 2, 5, 13, 0),
    },
  ];


const VolunteerAgenda = () => {
  const [events, setEvents] = useState(activities);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleRegister = () => {
    console.log('Voluntario registrado para:', selectedEvent);
    setShowRegisterForm(false);
  };

  return (
    <div className="App">
      <div className='calendar-container'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable={true}
          onSelectEvent={(event) => {
            setSelectedEvent(event);
            setShowRegisterForm(true);
          }}
        />
        {showRegisterForm && (
          <div>
            <h3>¿Quieres unirte a este evento?</h3>
            <button onClick={handleRegister}>Sí</button>
            <button onClick={() => setShowRegisterForm(false)}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerAgenda;

