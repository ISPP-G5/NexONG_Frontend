import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import HeaderVolunteer from '../components/HeaderVolunteer';
import MenuVolunteer from '../components/MenuVolunteer';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const localizer = momentLocalizer(moment);

const VolunteerAgenda = () => {
  const [activities, setActivities] = useState([]);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    volunteerId: ''
  });
  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    axios.get(`${API_ENDPOINT}user/`)
      .then(response => {
        const userWithUserId = response.data.find(user => user.id === userId);
        if (userWithUserId) {
            setCurrentUser({
            volunteerId: userWithUserId.volunteer
          });
        } else {
          console.error('No user found with the provided user ID.');
        }
      })
      .catch(error => {
        console.error(error);
      });
    axios.get(`${API_ENDPOINT}event/`)
      .then(response => {
        const filteredActivities = response.data.filter(activity => moment(activity.start_date).isAfter(moment()));
        setActivities(filteredActivities.map(activity => ({
            title: activity.name,
            start: new Date(activity.start_date),
            end: new Date(activity.end_date),
            id: activity.id,
            description: activity.description,
            place: activity.place,
            max_volunteers: activity.max_volunteers,
            max_attendees: activity.max_attendees,
            
            price: activity.price,
            attendees: activity.attendees,
            volunteers: activity.volunteers,
            url: activity.url
        })));
      })
      .catch(error => {
        console.error(error);
      });
  }, [userId]);
  

  const handleRegister = () => {
    if (!currentUser.volunteerId) {
      console.error('The current volunteer cannot be registered. Volunteer ID not available.');
      return;
    }
    if (selectedEvent.volunteers.includes(currentUser.volunteerId)) {
      window.alert('Usted ya pertenece a este evento.');
      return;
    }
    const updatedVolunteers = [...selectedEvent.volunteers, currentUser.volunteerId];
    if (updatedVolunteers.length > selectedEvent.max_volunteers) {
      window.alert('El número de voluntarios excede el límite máximo permitido.');
      return;
    }
    
    axios.put(`${API_ENDPOINT}event/${selectedEvent.id}/`, { 
      id: selectedEvent.id,
      name: selectedEvent.title,
      description: selectedEvent.description,
      place: selectedEvent.place,
      max_volunteers: selectedEvent.max_volunteers,
      max_attendees: selectedEvent.max_attendees,
      start_date: selectedEvent.start,
      end_date: selectedEvent.end,
      price: selectedEvent.price,
      attendees: selectedEvent.attendees,
      volunteers: updatedVolunteers,
      url: selectedEvent.url
    })
      .then(response => {
        console.log('Registered volunteer for:', selectedEvent);
        setShowRegisterForm(false);
        window.alert('Se ha unido correctamente')
        window.location.reload(true);
      })
      .catch(error => {
        console.error('Error when registering the volunteer:', error);
      });
  };

  return (
    <div className="App">
      <HeaderVolunteer />
      <div className='volunteer-main'>
        <MenuVolunteer selected='Agenda' />
        <div className='vertical-line' />

        <div className='volunteer-container'>
          <Calendar
            localizer={localizer}
            events={activities}
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
            <div className='register-form-container-add-volunteer'>
                <div className='register-form-add-volunteer'>
                    <h3>¿Quieres unirte a este evento?</h3>
                    <button onClick={handleRegister}>Sí</button>
                    <button onClick={() => setShowRegisterForm(false)}>No</button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerAgenda;


