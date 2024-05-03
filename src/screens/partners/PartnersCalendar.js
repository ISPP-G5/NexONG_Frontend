import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import useToken from '../../components/useToken';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import useStyles from '../../components/StylesCalendar';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const localizer = momentLocalizer(moment);

const PartnersCalendar = () => {
  const [token, updateToken] = useToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
  const [activities, setActivities] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const partnerId = parseInt(localStorage.getItem('partnerId'));

  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({});

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
        const filteredMeetings = response.data.filter(meeting => meeting.attendees.includes(partnerId));
        const formattedMeetings = filteredMeetings.map((meeting) => {
          // Combine date and time into a single Date object
          const dateTime = new Date(`${meeting.date}T${meeting.time}`);
          return {
            id: meeting.id,
            title: meeting.name, 
            description: meeting.description,
            attendees: meeting.attendees,
            start: dateTime, 
            end: dateTime, 
            type: 'meeting', 
          };
        });
        setMeetings(formattedMeetings);
      })
      .catch((error) => {
        console.error('Error fetching meetings:', error);
      });
  }, []);

  const handleEventClick = (event) => {
  // Check if it's a meeting event
  if (event.type === 'meeting') {
    // Display the information without editing
    const attendeesArray = Array.isArray(event.attendees) ? event.attendees : [event.attendees];

    setDialogContent({
      name: event.title,
      description: event.description,
      attendees: attendeesArray,
      date: event.start.toISOString().split('T')[0],
      time: event.start.toISOString().split('T')[1].substring(0, 5),
    });
    setOpen(true); // Open the dialog to display meeting information
  } else {
    // For non-meeting events, proceed with editing
    const attendeesArray = Array.isArray(event.attendees) ? event.attendees : [event.attendees];
    const volunteersArray = Array.isArray(event.volunteers) ? event.volunteers : [event.volunteers];
    const startDate = moment(event.start).format('YYYY-MM-DDTHH:mm');
    const endDate = moment(event.end).format('YYYY-MM-DDTHH:mm');

    setDialogContent({
      name: event.title,
      description: event.description,
      place: event.place,
      max_volunteers: event.max_volunteers,
      max_attendees: event.max_attendees,
      price: event.price,
      attendees: attendeesArray,
      volunteers: volunteersArray,
      start_date: startDate,
      end_date: endDate,
    });
    setOpen(true);
  }
};

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LayoutProfiles profile={'socio'} selected={'Calendario'}>
        <div className={classes.calendarContainer}>
          <Calendar
            localizer={localizer}
            events={[...activities, ...meetings]}
            startAccessor="start"
            endAccessor="end"
            className='calendar'
            onSelectEvent={handleEventClick}
            eventPropGetter={(event) => ({
              className: event.type === 'meeting' ? 'meeting-event' : 'normal-event',
              style: event.type === 'meeting' ? { backgroundColor: 'orange' } : {},
            })}
          />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{dialogContent.name}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Descripcion: {dialogContent.description}
              </DialogContentText>
              <DialogContentText>
                {dialogContent.place && `Sitio: ${dialogContent.place}`}
              </DialogContentText>
              <DialogContentText>
                {dialogContent.volunteers && `Voluntarios: ${dialogContent.volunteers}`} 
              </DialogContentText>
              <DialogContentText>
                {dialogContent.attendees && `Asistentes: ${dialogContent.attendees}`} 
              </DialogContentText>
              <DialogContentText>
                {dialogContent.date ? `Fecha: ${moment(dialogContent.date).format('YYYY-MM-DD')}` : `Fecha inicio: ${moment(dialogContent.start_date).format('YYYY-MM-DD HH:mm')}`}
              </DialogContentText>
              <DialogContentText>
                {dialogContent.time ? `Hora: ${moment(dialogContent.time).format('HH:mm')}` : `Fecha final: ${moment(dialogContent.end_date).format('YYYY-MM-DD HH:mm')}`}
              </DialogContentText>
            </DialogContent>
          </Dialog>
       </div>
    </LayoutProfiles>
   
  );
};

export default PartnersCalendar;
