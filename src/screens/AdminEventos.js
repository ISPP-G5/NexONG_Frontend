import '../styles/styles.css';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, makeStyles } from '@material-ui/core';
import AdminLayout from '../components/AdminLayout';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';


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
    addClassButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '10%',
      marginTop: '2%',
      height: '10%',
      backgroundColor: '#fff',
      border: 'none',
      color: '#2196f3',
      fontSize: '2rem',
      cursor: 'pointer',
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
    const [eventTitle] = useState('');
    const [eventDate] = useState('');
    const [eventTime] = useState('');
    const [volunteers, setVolunteers] = useState([]);
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    const clearLocalFormData = () => {
      setLocalFormData({
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
    };

    const handleSelect = ({ start }) => {
      setOpenAddDialog(true);
      clearLocalFormData();
      const selectedDate = moment(start).format('YYYY-MM-DDTHH:mm');
      setLocalFormData(prevState => ({
        ...prevState,
        start_date: selectedDate,
      }));
    };

    const handleEventCreate = () => {
      setOpenAddDialog(true);
      clearLocalFormData();
    };
    

    useEffect(() => {
      axios
        .get(`${API_ENDPOINT}event/`)
        .then((response) => {
          console.log('response event:', response.data);
          const formattedEvents = response.data.map(event => ({
            id: event.id,
            title: event.name,
            description: event.description,
            place: event.place,
            max_volunteers: event.max_volunteers,
            max_attendees: event.max_attendees,
            price: event.price,
            attendees: event.attendees, 
            volunteers: event.volunteers,
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

    const handleSubmit = () => {

      axios
        .post(`${API_ENDPOINT}event/`, localFormData)
        .then((response) => {
          console.log('Response of post:', response.data);
          setEvents([...events, response.data]);
          setOpenAddDialog(false);
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
      // Convert attendees and volunteers to arrays if they are not already
      const attendeesArray = Array.isArray(event.attendees) ? event.attendees : [event.attendees];
      const volunteersArray = Array.isArray(event.volunteers) ? event.volunteers : [event.volunteers];
      setLocalFormData({
        name: event.title,
        description: event.description,
        place: event.place,
        max_volunteers: event.max_volunteers,
        max_attendees: event.max_attendees,
        price: event.price,
        attendees: attendeesArray,
        volunteers: volunteersArray,
        start_date: moment(event.start).format('YYYY-MM-DDTHH:mm'),
        end_date: moment(event.end).format('YYYY-MM-DDTHH:mm'),
      });
      setOpenEditDialog(true);


    };
    

    const inputStyle = {
      width: '80%',
      borderRadius: '1rem',
      boxSizing: 'border-box',
    };
    
    const labelStyle = {
      width: '80%',
      fontFamily: 'Helvetica',
      fontWeight: '505',
      fontSize: '1rem',
      lineHeight: '1.75rem',
      color: '#7C838A',
      marginBottom: '0.5rem', // Adjusted margin
    };
    

    function renderTextFieldComponents() {
      return (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <a style={labelStyle}>Nombre del evento</a>
            <TextField
              value={localFormData.name}
              onChange={(e) => setLocalFormData({ ...localFormData, name: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <a style={labelStyle}>Descripción</a>
            <TextField
              value={localFormData.description}
              onChange={(e) => setLocalFormData({ ...localFormData, description: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <a style={labelStyle}>Lugar</a>
            <TextField
              value={localFormData.place}
              onChange={(e) => setLocalFormData({ ...localFormData, place: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <a style={labelStyle}>Precio</a>
            <TextField
              type="number"
              value={localFormData.price}
              onChange={(e) => setLocalFormData({ ...localFormData, price: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <a style={labelStyle}>Máximo Voluntarios</a>
            <TextField
              type="number"
              value={localFormData.max_volunteers}
              onChange={(e) => setLocalFormData({ ...localFormData, max_volunteers: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <a style={labelStyle}>Voluntarios</a>
            <Select
              name="volunteers"
              multiple
              style={{ ...inputStyle, marginBottom: '0.5rem' }}
              value={localFormData.volunteers}
              onChange={(e) => setLocalFormData({ ...localFormData, volunteers: e.target.value })}
              fullWidth
            >
              {volunteers.map((volunteer) => (
                <MenuItem key={volunteer.id} value={volunteer.id}>
                  {users.find((user) => user.id === volunteer.id)?.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <a style={labelStyle}>Máximo asistentes</a>
            <TextField
              type="number"
              value={localFormData.max_attendees}
              onChange={(e) => setLocalFormData({ ...localFormData, max_attendees: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
             <a style={labelStyle}>Alumnos que asisten</a>
            <Select
              name="attendees"
              multiple
              style={{ ...inputStyle, marginBottom: '0.5rem' }}
              value={localFormData.attendees}
              onChange={(e) => setLocalFormData({ ...localFormData, attendees: e.target.value })}
              fullWidth
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <a style={labelStyle}>Fecha Inicio</a>
            <TextField
              type="datetime-local"
              value={localFormData.start_date}
              onChange={(e) => setLocalFormData({ ...localFormData, start_date: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <a style={labelStyle}>Fecha fin</a>
            <TextField
              type="datetime-local"
              value={localFormData.end_date}
              onChange={(e) => setLocalFormData({ ...localFormData, end_date: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </div>
        
          
          
        </>
      );
    }
    
    

    return (
      <AdminLayout selected='Eventos'>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>


        <button className={classes.addClassButton} onClick={() => handleEventCreate()}>

        <AddCircleIcon fontSize='large' />

        Crear Evento
        </button>
        </div>
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