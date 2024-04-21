import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import useToken from '../../components/useToken';
import {makeStyles }from '@material-ui/core';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const localizer = momentLocalizer(moment);
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },

  calendarContainer: {
    flex: 1,
    position: 'relative',
    minHeight: '20rem',
    marginTop: '2rem',
    overflow: 'hidden',
    width: '90%',
  },
}));
const PartnersCalendar = () => {
  const [token, updateToken] = useToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
  const [activities, setActivities] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get(`${API_ENDPOINT}event/`, config)
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
      axios
      .get(`${API_ENDPOINT}meeting/`, config)
      .then((response) => {
        console.log('response asambleas:', response.data);
        const formattedMeetings = response.data.map((meeting) => ({
          id: meeting.id,
          title: meeting.name, 
          description: meeting.description,
          attendees: meeting.attendees,
          start: new Date(meeting.time), 
          end: new Date(meeting.date), 
          type: 'meeting', 
        }));
        setMeetings(formattedMeetings);
      })
      .catch((error) => {
        console.error('Error fetching meetings:', error);
      });
  }, []);
  

  return (
    <LayoutProfiles profile={'socio'} selected={'Calendario'}>
        <div className={classes.calendarContainer}>

      <Calendar
        localizer={localizer}
        events={[...activities, ...meetings]}
        startAccessor="start"
        endAccessor="end"
        className='calendar'
        eventPropGetter={(event) => ({
          className: event.type === 'meeting' ? 'meeting-event' : 'normal-event', // Define CSS classes for meetings and events
          style: event.type === 'meeting' ? { backgroundColor: 'orange' } : {}, // Set different background colors for meetings and events
        })}
      />
       </div>
    </LayoutProfiles>
   
  );
};

export default PartnersCalendar;
