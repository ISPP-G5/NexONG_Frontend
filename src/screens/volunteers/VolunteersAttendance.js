import React, { useEffect, useState } from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import useToken from '../../components/useToken';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const VolunteersAttendance = () => {
  const [token, updateToken] = useToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };

  const [eventsList, setEventsList] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    volunteerId: ''
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    event: null
  });
  const [lessonAttendance, setLessonAttendance] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchLessonAttendance = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}lesson-attendance/`, config);
        setLessonAttendance(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessonAttendance();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}auth/users/me/`, config);
        setCurrentUser({
          volunteerId: response.data.volunteer
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}schedule/`, config);
        setSchedules(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventResponses = await Promise.all([
          axios.get(`${API_ENDPOINT}event/`, config),
          axios.get(`${API_ENDPOINT}lesson-event/`, config)
        ]);

        const eventsData = eventResponses.reduce((acc, response) => {
          acc.push(...response.data);
          return acc;
        }, []);

        const filteredEvents = eventsData.filter(activity =>
          moment(activity.start_date).isAfter(moment()) &&
          activity.volunteers.includes(currentUser.volunteerId)
        );

        setEventsList(filteredEvents.map(activity => ({
          ...activity,
          start_date: new Date(activity.start_date),
          end_date: new Date(activity.end_date),
          type: activity.lesson ? 'lesson-event' : 'event'
        })));
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [currentUser.volunteerId]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const eventResponses = await Promise.all([
          axios.get(`${API_ENDPOINT}lesson/`, config)
        ]);

        const eventsData = eventResponses.reduce((acc, response) => {
          acc.push(...response.data);
          return acc;
        }, []);

        const filteredLessons = eventsData.filter(activity =>
          moment(activity.end_date).isAfter(moment()) &&
          lessonAttendance.some(attendance => attendance.lesson === activity.id && attendance.volunteer === currentUser.volunteerId)
        );
        setEventsList(preEvents => [
          ...preEvents,
          ...filteredLessons.map(activity => ({
          ...activity,
          start_date: new Date(activity.start_date),
          end_date: new Date(activity.end_date),
          type: 'lesson'
        }))
      ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLessons();
  }, [lessonAttendance]);

  const handleDeleteConfirmation = (event) => {
    setDeleteConfirmation({
      open: true,
      event: event
    });
  };

  const handleDeleteVolunteer = async () => {
    try {
      let url = `${API_ENDPOINT}${deleteConfirmation.event.lesson ? 'lesson-event' : 'event'}/${deleteConfirmation.event.id}/`;
      let data = { ...deleteConfirmation.event };

      if (deleteConfirmation.event.type === 'lesson') {
        const attendanceId = lessonAttendance.find(attendance =>
          attendance.lesson === deleteConfirmation.event.id && attendance.volunteer === currentUser.volunteerId
        ).id;
        url = `${API_ENDPOINT}lesson-attendance/${attendanceId}`;
      } else {
        const updatedVolunteers = deleteConfirmation.event.volunteers.filter(volunteer =>
          volunteer !== currentUser.volunteerId
        );
        data.volunteers = updatedVolunteers;
      }

      const response = await axios.put(url, data, config);
      toast.success('Se ha eliminado correctamente');
      setDeleteConfirmation({
        open: false,
        event: null
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error al eliminar el voluntario:', error);
      toast.error('Error al eliminar el voluntario');
      setDeleteConfirmation({ open: false, event: null });
    }
  };

  return (
    <LayoutProfiles profile={'voluntario'} selected={'Asistencia'}>
      <ToastContainer/>
      {eventsList.length === 0 ? (
        <div className="centered-message">
          <p>No te has unido a ningún evento aún</p>
        </div>
      ) : (
        eventsList.map((event) => (
          <div className='card-info' key={event.id + event.name}>
            <div>
              <p><strong>Evento:</strong> {event.name}</p>
              <p><strong>Tipo:</strong> {event.type === 'event' ? 'Evento' : event.type === 'lesson' ? 'Clase' : 'Excursión'}</p>
              {event.type === 'event' || event.type === 'lesson-event' ?  
                (<div>
                  <p><strong>Comienzo: </strong>{event.start_date.getDate()}/{event.start_date.getMonth()+1}/{event.start_date.getFullYear()}, {event.start_date.getHours()}h</p>
                  <p><strong>Final: </strong>{event.end_date.getDate()}/{event.end_date.getMonth()+1}/{event.end_date.getFullYear()}, {event.end_date.getHours()}h</p>
                </div>) 
                : 
                (<div>
                  <p><strong>Comienzo: </strong>{event.start_date.getDate()}/{event.start_date.getMonth()+1}/{event.start_date.getFullYear()}</p>
                  <p><strong>Final: </strong>{event.end_date.getDate()}/{event.end_date.getMonth()+1}/{event.end_date.getFullYear()}</p>
                  <div><p><strong>Horario:</strong></p> {
                    schedules.filter(schedule => schedule.lesson === event.id).map(schedule => 
                      <p>{schedule.weekday} de {schedule.start_time} a {schedule.end_time}</p>
                    )
                  }</div>
                </div>) 
              }
            </div>
            <div className='edit-delete-icons'>
              <DeleteIcon className='trash' onClick={() => handleDeleteConfirmation(event)} />
            </div>
          </div>
        ))
      )}

      <Dialog open={deleteConfirmation.open} onClose={() => setDeleteConfirmation({ open: false, event: null })}>
        <DialogTitle>¿Quieres eliminar tu participación en este evento?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteVolunteer} color="primary">
            Sí
          </Button>
          <Button onClick={() => setDeleteConfirmation({ open: false, event: null })} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </LayoutProfiles>
  );
}

export default VolunteersAttendance;
