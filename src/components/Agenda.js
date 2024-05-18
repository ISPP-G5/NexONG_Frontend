import React, { useState } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import 'moment/locale/es';
import Globalize from 'globalize';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import useToken from '../../components/useToken';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const localizer = globalizeLocalizer(Globalize);

const Agenda = ({ activities, schedules, lessonAttendance, currentUser }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [token] = useToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleRegister = async () => {
    if (!currentUser.volunteerId) {
      console.error('The current volunteer cannot be registered. Volunteer ID not available.');
      toast.error('El voluntario actual no puede registrarse. Identificación de voluntario no disponible.');
      return;
    }
    
    if (!selectedEvent) {
      console.error('No event selected.');
      return;
    }

    if (selectedEvent.type === 'event' || selectedEvent.type === 'lesson-event') {
      if (selectedEvent.volunteers.includes(currentUser.volunteerId)) {
        toast.error('Usted ya pertenece a este evento.');
        setShowRegisterForm(false);
        return;
      }
      const updatedVolunteers = [...selectedEvent.volunteers, currentUser.volunteerId];
      if (updatedVolunteers.length > selectedEvent.max_volunteers) {
        toast.error('El número de voluntarios excede el límite máximo permitido.');
        return;
      }
      console.log('Registering volunteer for:', selectedEvent);
      try {
        const response = await axios.put(`${API_ENDPOINT}${selectedEvent.lesson ? 'lesson-event' : 'event'}/${selectedEvent.id}/`, {
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
        }, config);
        console.log('Registered volunteer for:', selectedEvent);
        setShowRegisterForm(false);
        toast.success('Se ha unido correctamente');
        window.location.reload(true);
      } catch (error) {
        console.error('Error when registering the volunteer:', error);
        toast.error('Hubo un error al unirse a la clase.');
      }
    } else if(selectedEvent.type === 'lesson'){
      const newAttendance = {
        lesson: selectedEvent.id,
        volunteer: currentUser.volunteerId,
        date: moment().format('YYYY-MM-DD')
      };
      console.log(newAttendance);
      try {
        const response = await axios.post(`${API_ENDPOINT}lesson-attendance/`, newAttendance, config);
        console.log('Registered volunteer for:', selectedEvent);
        setShowRegisterForm(false);
        toast.success('Se ha unido correctamente');
        window.location.reload(true);
      } catch (error) {
        console.error('Error when registering the volunteer:', error);
        toast.error('Hubo un error al unirse a la clase.');
      }
    }
  };

  const lessonColor = '#3399ff'
  const lessonEventColor = '#ff66cc'
  const EventColor = '#ccff66'

  const eventStyleGetter = (event) => {
    let backgroundColor;
    if (event.type === 'event') {
      backgroundColor = EventColor;
      if (event.volunteers.includes(currentUser.volunteerId)) {
        backgroundColor = 'purple';
      }
    } else if (event.type === 'lesson-event') {
      backgroundColor = lessonEventColor;
      if (event.volunteers.includes(currentUser.volunteerId)) {
        backgroundColor = 'purple';
      }
    } else if (event.type === 'lesson') {
      backgroundColor = lessonColor;
      if (lessonAttendance.some((attendance) => attendance.lesson === event.id && attendance.volunteer === currentUser.volunteerId)) {
        backgroundColor = 'purple';
      }
    }
    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={activities}
        startAccessor="start"
        endAccessor="end"
        className="calendar"
        selectable={true}
        handleRegister= {handleRegister}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
          setShowRegisterForm(true);
        }}
        eventPropGetter={eventStyleGetter}
      />
      <Dialog open={showRegisterForm} onClose={() => setShowRegisterForm(false)}>
        <DialogTitle>{selectedEvent && selectedEvent.educator ? '¿Quieres unirte a esta clase?' : '¿Quieres unirte a este evento?'}</DialogTitle>
        <DialogActions>
          <Button onClick={handleRegister} color="primary">
            Sí
          </Button>
          <Button onClick={() => setShowRegisterForm(false)} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default Agenda;