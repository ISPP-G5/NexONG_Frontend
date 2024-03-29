import React, { useEffect, useState } from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const VolunteersAttendance = () => {
    const [eventsList, setEventsList] = useState([]);
    const [currentUser, setCurrentUser] = useState({
      volunteerId: ''
    });
    const [deleteConfirmation, setDeleteConfirmation] = useState({
      open: false,
      event: null
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

    const handleDeleteConfirmation = (event) => {
      setDeleteConfirmation({
          open: true,
          event: event
      });
  };

  const handleDeleteVolunteer = () => {
      const updatedVolunteers = deleteConfirmation.event.volunteers.filter(volunteer => volunteer !== currentUser.volunteerId);
      axios.put(`${API_ENDPOINT}event/${deleteConfirmation.event.id}/`, { ...deleteConfirmation.event, volunteers: updatedVolunteers })
          .then(response => {
              window.alert('Se ha eliminado correctamente');
              setDeleteConfirmation({
                  open: false,
                  event: null
              });
              window.location.reload(true);
          })
          .catch(error => {
              console.error('Error al eliminar el voluntario:', error);
              toast.error('Error al elimninar el voluntario')
              setDeleteConfirmation({ open: false, event: null })
          });
  };

  return (
    <LayoutProfiles profile={'voluntario'} selected={'Asistencia'}>
      <ToastContainer/>
            {eventsList.map((event) => (
                <div className='card-info' key={event.id}>
                    <div>
                        <p>Evento: {event.name}</p>
                        <p>Comienzo: {event.start_date.getDate()}/{event.start_date.getMonth()}/{event.start_date.getFullYear()}, {event.start_date.getHours()}h</p>
                        <p>Final: {event.end_date.getDate()}/{event.end_date.getMonth()}/{event.end_date.getFullYear()}, {event.end_date.getHours()}h</p>
                    </div>
                    <div className='edit-delete-icons'>
                        <DeleteIcon className='trash' onClick={() => handleDeleteConfirmation(event)} />
                    </div>
                </div>
            ))}

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