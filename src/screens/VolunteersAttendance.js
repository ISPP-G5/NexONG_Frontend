import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import HeaderVolunteer from '../components/HeaderVolunteer';
import MenuVolunteer from '../components/MenuVolunteer';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const VolunteersAttendance = () => {
    const [eventsList, setEventsList] = useState([]);
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
          const filteredEvents = response.data.filter(activity => activity.volunteers.includes(currentUser.volunteerId));
          setEventsList(filteredEvents.map(activity => ({
              name: activity.name,
              start_date: new Date(activity.start_date),
              end_date: new Date(activity.end_date),
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
    }, [userId,currentUser.volunteerId]);

  return (
    <div className='App'>
      <HeaderVolunteer />

      <div className='volunteer-main'>
        <MenuVolunteer selected='Asistencia' />
        <div className='vertical-line' />
        <div className='volunteer-container'>
              {eventsList.map((event, index) => (
              <div className='card-info-volunteer' key={index}>
                <div className='event-details'>
                    <p>Evento: {event.name}</p>
                    <p>Comienzo: {event.start_date.getDate()}/{event.start_date.getMonth()}/{event.start_date.getFullYear()}, {event.start_date.getHours()}h</p>
                    <p>Final: {event.end_date.getDate()}/{event.end_date.getMonth()}/{event.end_date.getFullYear()}, {event.end_date.getHours()}h</p>
                </div>
              </div>
              ))}
          </div>
        </div>
      </div>
  );
}

export default VolunteersAttendance;