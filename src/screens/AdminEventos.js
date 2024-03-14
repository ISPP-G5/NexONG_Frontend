import '../styles/styles.css';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, makeStyles } from '@material-ui/core';
import AdminLayout from '../components/AdminLayout';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function AdminEventos() {
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
  

  const AdminEvents = () => {
    const [localFormData, setLocalFormData] = useState({
      name: '',
      description: '',
      place: '',
      max_volunteers: '',
      max_attendees: '',
      price: '',
      attendees: [],
      volunteers: [],
      start_date: '',
      end_date: '',
    });
    const classes = useStyles();
    const [events, setEvents] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editEvent, setEditEvent] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [volunteers, setVolunteers] = useState([]);
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);

    const handleSelect = ({ start }) => {
      setEditEvent({ start, title: '', id: '' });
      setOpenAddDialog(true);
    };

    useEffect(() => {
      axios
        .get(`${API_ENDPOINT}event/`)
        .then((response) => {
          console.log('response event:', response.data);
          const formattedEvents = response.data.map(event => ({
            id: event.id,
            title: event.name,
            start: new Date(event.start_date),
            end: new Date(event.end_date),
          }));
          setEvents(formattedEvents);
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
        });
      axios
        .get(`${API_ENDPOINT}volunteer/`)
        .then((response) => {
          console.log('response volunteers:', response.data);
          setVolunteers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching volunteers:', error);
        });
      axios
        .get(`${API_ENDPOINT}student/`)
        .then((response) => {
          console.log('response students:', response.data);
          setStudents(response.data);
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
        });
        axios
        .get(`${API_ENDPOINT}user/`)
        .then((response) => {
          console.log('response user:', response.data);
          setUsers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    }, []);
  

    const handleEventAdd = () => {
      if (eventTitle && eventDate && eventTime) {
        const start = moment(eventDate + ' ' + eventTime, 'YYYY-MM-DD HH:mm').toDate();
        const newEvent = {
          start,
          end: moment(start).add(1, 'hour').toDate(),
          title: eventTitle,
          id: Math.random().toString(36).substring(7),
        };
        setEvents([...events, newEvent]);
        setEventTitle('');
        setEventDate('');
        setEventTime('');
        setOpenAddDialog(false);
      
        }
    };
    const handleSubmit = () => {
      // Handle the creation of the lesson here
      axios
        .post(`${API_ENDPOINT}event/`, localFormData)
        .then((response) => {
          console.log('Response of post:', response.data);
          setEvents([...events, response.data]);
        })
        .catch((error) => {
          console.error('Error creating lesson:', error);
        });
    };

    const handleEventEdit = () => {
      if (editEvent && eventTitle && eventDate && eventTime) {
        const start = moment(eventDate + ' ' + eventTime, 'YYYY-MM-DD HH:mm').toDate();
        const updatedEvent = {
          ...editEvent,
          start,
          end: moment(start).add(1, 'hour').toDate(),
          title: eventTitle,
        };
        setEvents(events.map((event) => (event.id === editEvent.id ? updatedEvent : event)));
        setEventTitle('');
        setEventDate('');
        setEventTime('');
        setOpenEditDialog(false);
      }
    };

    const handleEventDelete = () => {
      if (editEvent) {
        setEvents(events.filter((event) => event.id !== editEvent.id));
        setOpenEditDialog(false);
      }
    };

    const handleEventClick = (event) => {
      setEditEvent(event);
      setEventTitle(event.title);
      setEventDate(moment(event.start).format('YYYY-MM-DD'));
      setEventTime(moment(event.start).format('HH:mm'));
      setOpenEditDialog(true);
    };

    const inputStyle = {
      width: '80%',
      borderRadius: '1rem',
      margin: '0 auto',
      boxSizing: 'border-box',
    };

    function renderTextFieldComponents() {
      return (
        <>
          <TextField
            label="Nombre del evento"
            value={localFormData.name}
            onChange={(e) => setLocalFormData({ ...localFormData, name: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            label="Descripción"
            value={localFormData.description}
            onChange={(e) => setLocalFormData({ ...localFormData, description: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="Lugar"
            value={localFormData.place}
            onChange={(e) => setLocalFormData({ ...localFormData, place: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
              label="Precio"
              type="number"
              value={localFormData.price}
              onChange={(e) => setLocalFormData({ ...localFormData, price: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          <TextField
            label="Máximo de voluntarios"
            type="number"
            value={localFormData.max_volunteers}
            onChange={(e) => setLocalFormData({ ...localFormData, max_volunteers: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="Máximo de asistentes"
            type="number"
            value={localFormData.max_attendees}
            onChange={(e) => setLocalFormData({ ...localFormData, max_attendees: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="Fecha de inicio"
            type="datetime-local"
            value={localFormData.start_date}
            onChange={(e) => setLocalFormData({ ...localFormData, start_date: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="Fecha de fin"
            type="datetime-local"
            value={localFormData.end_date}
            onChange={(e) => setLocalFormData({ ...localFormData, end_date: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />  
          <Select
            name="attendees"
            multiple
            style={inputStyle}

            value={localFormData.attendees}
            onChange={(e) => setLocalFormData({ ...localFormData, attendees: e.target.value })}
          >
            {students.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name} {/* Change 'name' to the relevant property */}
              </MenuItem>
            ))}
          </Select>

          <Select
            name="volunteers"
            multiple
            style={inputStyle}

            value={localFormData.volunteers}
            onChange={(e) => setLocalFormData({ ...localFormData, volunteers: e.target.value })}
          >
            {volunteers.map((volunteer) => (
              <MenuItem key={volunteer.id} value={volunteer.id}>
                {users.find((user) => user.id === volunteer.id)?.name} {/* Get the name of the associated user */}
              </MenuItem>
            ))}
        </Select>

        </>
      );
    }

    return (
      <AdminLayout selected='Eventos'>
        <button
          className='button'
          onClick={() => setOpenAddDialog(true)}
        >
          Crear Evento
        </button>
        <div className={classes.calendarContainer}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            onSelectSlot={handleSelect}
            onSelectEvent={handleEventClick}
            views={['month', 'week', 'day']}
            selectable={true}
            step={15}
            timeslots={4}
            style={{ minHeight: '600px' }}
          />
        </div>
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Añadir Evento</DialogTitle>
          <DialogContent>
            {renderTextFieldComponents()}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)} color="primary">Volver</Button>
            <Button onClick={handleSubmit}color="primary">Agregar</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogContent>
            {renderTextFieldComponents()}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="primary">Volver</Button>
            <Button onClick={handleEventEdit} color="primary">Editar</Button>
            <Button onClick={handleEventDelete} color="secondary">Borrar</Button>
          </DialogActions>
        </Dialog>
      </AdminLayout>
    );
  }
  return <AdminEvents />;

}

export default AdminEventos;