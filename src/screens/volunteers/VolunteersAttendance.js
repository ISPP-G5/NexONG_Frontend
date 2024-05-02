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
import { type } from '@testing-library/user-event/dist/type';

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
  const userId = parseInt(localStorage.getItem('userId'));
  const [lessonAttendance, setLessonAttendance] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    axios.get(`${API_ENDPOINT}auth/users/me/`, config)
      .then(response => {
          setCurrentUser({
            volunteerId: response.data.volunteer
          });
      })
      .catch(error => {
        console.error(error);
      });

    const fetchLessonAttendance = async () => {
      try {
          const response = await axios.get(`${API_ENDPOINT}lesson-attendance/`, config);
          setLessonAttendance(response.data);
      } catch (error) {
          console.error(error);
      }
    };
    fetchLessonAttendance();

    const fetchAndSetSchedule = async () => {
      const response = await axios.get(`${API_ENDPOINT}schedule/`, config);
      if (response) {
          setSchedules(response.data);
      }
  };  
  fetchAndSetSchedule();
  }, []);

    useEffect(() => {
      axios.get(`${API_ENDPOINT}event/`, config)
        .then(response => {
          const filteredEvents = response.data.filter(activity => moment(activity.start_date).isAfter(moment()) && 
                                                                activity.volunteers.includes(currentUser.volunteerId));
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
              url: activity.url,
              type: 'event'
          })));
        })
        .catch(error => {
          console.error(error);
        });

        axios.get(`${API_ENDPOINT}lesson-event/`, config)
        .then(response => {
          const filteredEvents = response.data.filter(activity => moment(activity.start_date).isAfter(moment()) &&
                                                                  activity.volunteers.includes(currentUser.volunteerId));
          setEventsList(prevEvents => [...prevEvents, ...filteredEvents.map(activity => ({
            id: activity.id,
            name: activity.name,
            description: activity.description,
            place: activity.place,
            max_volunteers: activity.max_volunteers,
            start_date: new Date(activity.start_date),
            end_date: new Date(activity.end_date),          
            lesson: activity.lesson,
            price: activity.price,
            educators: activity.educators,
            attendees: activity.attendees,
            volunteers: activity.volunteers,
            url: activity.url,
            type: 'lesson-event'
          }))]);
        })
        .catch(error => {
          console.error(error);
        } );

        axios.get(`${API_ENDPOINT}lesson/`, config)
        .then(response => {
          const filteredEvents = response.data.filter(activity => moment(activity.end_date).isAfter(moment()) &&
          lessonAttendance.some(attendance => attendance.lesson === activity.id && attendance.volunteer === currentUser.volunteerId));
          setEventsList(prevEvents => [...prevEvents, ...filteredEvents.map(activity => ({
            id: activity.id,
            name: activity.name,
            description: activity.description,
            capacity: activity.capacity,
            is_morning_lesson: activity.is_morning_lesson,
            start_date: new Date(activity.start_date),
            end_date: new Date(activity.end_date),          
            educator: activity.educator,
            students: activity.students,
            url: activity.url,
            type: 'lesson'
          }))]);
        })
        .catch(error => {
          console.error(error);
        } );
        
    }, [userId,currentUser.volunteerId,lessonAttendance]);

    const handleDeleteConfirmation = (event) => {
      setDeleteConfirmation({
          open: true,
          event: event
      });
  };

  const handleDeleteVolunteer = () => {
    if (deleteConfirmation.event.type === 'lesson-event' || deleteConfirmation.event.type === 'event') {
      const updatedVolunteers = deleteConfirmation.event.volunteers.filter(volunteer => volunteer !== currentUser.volunteerId);
      axios.put(`${API_ENDPOINT}${deleteConfirmation.event.lesson ? 'lesson-event' : 'event'}/${deleteConfirmation.event.id}/`, { ...deleteConfirmation.event, volunteers: updatedVolunteers }, config)
          .then(response => {
              toast.success('Se ha eliminado correctamente');
              setDeleteConfirmation({
                  open: false,
                  event: null
              });
              setTimeout(() => {
                  window.location.reload();
              }, 1000);
          })
          .catch(error => {
              console.error('Error al eliminar el voluntario:', error);
              toast.error('Error al elimninar el voluntario')
              setDeleteConfirmation({ open: false, event: null })
          });
    }else if (deleteConfirmation.event.type === 'lesson') {
      const attendanceId = lessonAttendance.find(attendance => attendance.lesson === deleteConfirmation.event.id && attendance.volunteer === currentUser.volunteerId).id;
      axios.delete(`${API_ENDPOINT}lesson-attendance/${attendanceId}`, config)
          .then(response => {
              toast.success('Se ha eliminado correctamente');
              setDeleteConfirmation({
                  open: false,
                  event: null
              });
              setTimeout(() => {
                  window.location.reload();
              }, 1000);
          })
          .catch(error => {
              console.error('Error al eliminar el voluntario:', error);
              toast.error('Error al elimninar el voluntario')
              setDeleteConfirmation({ open: false, event: null })
          });
    }
  };

  return (
    <LayoutProfiles profile={'voluntario'} selected={'Asistencia'}>
      <ToastContainer/>
      {eventsList.length === 0 ? (
        <div className= "centered-message">
        <p>No te has unido a ningún evento aún</p>
        </div>
      ) : (
        eventsList.map((event) => (
          <div className='card-info' key={event.id}>
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
                  <p><strong>Horario:</strong> {
                    schedules.filter(schedule => schedule.lesson === event.id).map(schedule => 
                    <p>{schedule.weekday} de {schedule.start_time} a {schedule.end_time}</p>
                    )
                  }</p>
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