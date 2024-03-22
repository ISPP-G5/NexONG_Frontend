import '../../styles/styles.css';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, makeStyles } from '@material-ui/core';
import LayoutProfiles from '../../components/LayoutProfiles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ButtonCreate from '../../components/ButtonCreate';
import 'react-toastify/dist/ReactToastify.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const labelStyle = {
  width: '80%',
  fontFamily: 'Helvetica',
  fontWeight: '505',
  fontSize: '1rem',
  lineHeight: '1.75rem',
  color: '#7C838A',
  marginBottom: '0.5rem',
};

function AdminEvents() {
  const localizer = momentLocalizer(moment);
  const initialFormData = {
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
  };

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

  const MultiSelect = ({ label, options, value, onChange }) => {

    return (
      <div style={{ marginBottom: '1rem' }}>
        <a style={labelStyle}>{label}</a>
        <Select multiple value={value} onChange={onChange} fullWidth>
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  };

  const renderTextFieldComponent = (label, value, onChangeHandler, type = 'text') => {
    const inputStyle = {
      boxSizing: 'none',
      border: 'none',
      backgroundColor: 'transparent',
      width: '100%',
    };



    return (
      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>{label}</label>
        <TextField
          type={type}
          value={value}
          onChange={(e) => onChangeHandler(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          inputProps={{
            min: 0,
            style: inputStyle
          }}
        />
      </div>
    );
  };

  const AdminEvents = () => {
    const [localFormData, setLocalFormData] = useState(initialFormData);
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
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const clearLocalFormData = () => {
      setLocalFormData(initialFormData);
    };


    const handleSelect = ({ start }) => {
      setOpenAddDialog(true);
      clearLocalFormData();
      const selectedDate = moment(start).format('YYYY-MM-DDTHH:mm');
      setLocalFormData((prevState) => ({
        ...prevState,
        start_date: selectedDate,
      }));
    };

    const handleEventCreate = () => {
      setOpenAddDialog(true);
      clearLocalFormData();
    };
    const [recurringEvent, setRecurringEvent] = useState(false);
    const [recurrenceFrequency, setRecurrenceFrequency] = useState('weekly'); // Default to weekly
    const [numOccurrences, setNumOccurrences] = useState(1);

    const renderTextFieldComponents = () => {
      return (
        <>
          {renderTextFieldComponent('Nombre del evento', localFormData.name, (value) => setLocalFormData({ ...localFormData, name: value }))}
          {renderTextFieldComponent('Descripción', localFormData.description, (value) => setLocalFormData({ ...localFormData, description: value }))}
          {renderTextFieldComponent('Lugar', localFormData.place, (value) => setLocalFormData({ ...localFormData, place: value }))}
          {renderTextFieldComponent('Precio', localFormData.price, (value) => setLocalFormData({ ...localFormData, price: value}), 'number')}
          {renderTextFieldComponent('Máximo Voluntarios', localFormData.max_volunteers, (value) => setLocalFormData({ ...localFormData, max_volunteers: value }), 'number')}
          {renderTextFieldComponent('Máximo asistentes', localFormData.max_attendees, (value) => setLocalFormData({ ...localFormData, max_attendees: value }), 'number')}
          {renderTextFieldComponent('Fecha Inicio', localFormData.start_date, (value) => setLocalFormData({ ...localFormData, start_date: value }), 'datetime-local')}
          {renderTextFieldComponent('Fecha fin', localFormData.end_date, (value) => setLocalFormData({ ...localFormData, end_date: value }), 'datetime-local')}
          {/* {renderTextFieldComponent('Recurrence Frequency', recurrenceFrequency, setRecurrenceFrequency)} */}
          <MultiSelect
              label="Alumnos que asisten"
            options={students}
            value={localFormData.attendees}
            onChange={(e) => setLocalFormData({ ...localFormData, attendees: e.target.value })}
          />
          {recurringEvent && renderTextFieldComponent('Number of Occurrences', numOccurrences, setNumOccurrences, 'number')}

          <Button variant="outlined" color="primary" onClick={() => setRecurringEvent(!recurringEvent)}>
            {recurringEvent ? 'Make One-Time Event' : 'Make Recurring Event'}
          </Button>
        </>
      );
    };
    

    useEffect(() => {
      axios
        .get(`${API_ENDPOINT}event/`)
        .then((response) => {
          console.log('response event:', response.data);
          const formattedEvents = response.data.map((event) => ({
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
    
    const handleErrorResponse = (error) => {
      if (!localFormData.name || !localFormData.description || !localFormData.place || !localFormData.start_date || !localFormData.end_date || !localFormData.max_attendees || !localFormData.max_volunteers || !localFormData.volunteers || !localFormData.attendees || !localFormData.price) {
        toast.error('Por favor, rellene todos los campos.');
        return;
      }
      if (error.response && error.response.data) {
        const { data } = error.response;
        // Update state with backend validation errors
        if (data && data.detail) {
          toast.error('Error: ' + data.detail); // Customized Spanish error message
        } else if (data && data.name) {
          toast.error('Error: ' + data.name[0]); // Customized Spanish error message
        } else if (data && data.description) {
          toast.error('Error: ' + data.description[0]); // Customized Spanish error message
        } else if (data && data.place) {
          toast.error('Error: ' + data.place[0]); // Customized Spanish error message
        } else if (data && data.start_date) {
          toast.error('Error: La fecha inicial no puede ser anterior a la fecha actual'); // Customized Spanish error message
        } else if (data && data.end_date) {
          toast.error('Error: La fecha final no puede ser anterior a la fecha inicial'); // Customized Spanish error message
        } else if (data && data.max_attendees) {
          toast.error('Error: No pueden haber más asistentes que el máximo establecido'); // Customized Spanish error message
        } else if (data && data.max_volunteers) {
          toast.error('Error: No pueden haber más voluntarios que el máximo establecido'); // Customized Spanish error message
        } else {
          toast.error('Ha ocurrido un error al crear el evento.'); // Customized Spanish error message
        }
      } else {
        console.error('Error creating/updating event:', error);
        toast.error('Ha ocurrido un error al crear o actualizar el evento.');
      }
    };


    const handleRecurringEvent = () => {
      const selectedStartDate = moment(localFormData.start_date);
      
      for (let i = 0; i < numOccurrences; i++) {
        const eventData = {
          ...localFormData,
          start_date: selectedStartDate.format('YYYY-MM-DDTHH:mm'),
          end_date: moment(selectedStartDate)
            .add(moment(localFormData.end_date).diff(moment(localFormData.start_date)), 'milliseconds')
            .format('YYYY-MM-DDTHH:mm'),
        };
    
        // Send a POST request to create each individual event
        axios.post(`${API_ENDPOINT}event/`, eventData)
          .then((response) => {
            setEvents(prevEvents => [...prevEvents, response.data]);
            toast.success('Event created successfully');
            setOpenAddDialog(false);

          })
          .catch(handleErrorResponse);
        
        // Move to the next occurrence based on weekly recurrence
        selectedStartDate.add(1, 'weeks');
      }
 
    };
    

    const handleSubmit = () => {
      if (recurringEvent) {
        handleRecurringEvent();
      } else {
      if (!localFormData.name || !localFormData.description || !localFormData.place || !localFormData.start_date || !localFormData.end_date || !localFormData.max_attendees || !localFormData.max_volunteers || !localFormData.volunteers || !localFormData.attendees || !localFormData.price) {
        toast.error('Por favor, rellene todos los campos.');
        return;
      }
      axios
        .post(`${API_ENDPOINT}event/`, localFormData)
        .then((response) => {
          console.log('Response of post:', response.data);
          toast.success('Evento creado con éxito');

          setEvents([...events, response.data]);
          setOpenAddDialog(false);
        })
        .catch(handleErrorResponse);
      }
    };

    const handleEventEdit = () => {
      if (editEvent) {
        const updatedEventData = {
          ...editEvent,
          name: localFormData.name,
          description: localFormData.description,
          place: localFormData.place,
          max_volunteers: localFormData.max_volunteers,
          max_attendees: localFormData.max_attendees,
          price: localFormData.price,
          attendees: localFormData.attendees,
          volunteers: localFormData.volunteers,
          start_date: localFormData.start_date,
          end_date: localFormData.end_date,
        };
    
        axios
          .put(`${API_ENDPOINT}event/${editEvent.id}/`, updatedEventData)
          .then((response) => {
            const updatedEvent = response.data;
            setEvents(prevEvents =>
              prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
            );
            setOpenEditDialog(false);
            toast.success('Evento actualizado correctamente');
          })
          .catch((error) => {
            if (!localFormData.name || !localFormData.description || !localFormData.place || !localFormData.start_date || !localFormData.end_date || !localFormData.max_attendees || !localFormData.max_volunteers || !localFormData.volunteers || !localFormData.attendees || !localFormData.price) {
              toast.error('Por favor, rellene todos los campos.');
              return;
            }
            
            if (error.response && error.response.data) {
              const { data } = error.response;
              if (data && data.detail) {
                toast.error('Error: ' + data.detail); // General error message
              } else if (data && data.name) {
                toast.error('Error: ' + data.name[0]); // Error message for name field
              } else if (data && data.description) {
                toast.error('Error: ' + data.description[0]); // Error message for description field
              } else if (data && data.place) {
                toast.error('Error: ' + data.place[0]); // Error message for place field
              } else if (data && data.start_date) {
                toast.error('Error: La fecha inicial no puede ser anterior a la fecha actual'); // Customized Spanish error message
              } else if (data && data.end_date) {
                toast.error('Error: La fecha final no puede ser anterior a la fecha inicial'); // Customized Spanish error message
              } else if (data && data.max_attendees) {
                toast.error('Error: No pueden haber más asistenes que el máximo establecido'); // Customized Spanish error message
              } else if (data && data.max_volunteers) {
                toast.error('Error: No pueden haber más voluntarios que el máximo establecido'); // Customized Spanish error message
              } else {
                toast.error('Ha ocurrido un error al actualizar el evento.'); // Customized Spanish error message
              }
            } else {
              console.error('Error updating event:', error);
              toast.error('Ha ocurrido un error al actualizar el evento.');
            }
          });
      }
    };
    
    
    

    const handleEventDelete = () => {
      if (editEvent) {
        setEventToDelete(editEvent);
        setConfirmDeleteOpen(true);

    };
  };
    const handleConfirmDelete = () => {
      if (eventToDelete) {
        axios
          .delete(`${API_ENDPOINT}event/${eventToDelete.id}/`)
          .then(() => {
            setEvents(events.filter((event) => event.id !== eventToDelete.id));
            setOpenEditDialog(false);
            setConfirmDeleteOpen(false);
            setEventToDelete(null);
            toast.success('Evento eliminado correctamente');
          })
          .catch((error) => {
            console.error('Error deleting event:', error);
            toast.error('Ha ocurrido un error al eliminar el evento.');
          });
      }
    };
    

    const handleEventClick = (event) => {
      setEditEvent(event);
      const attendeesArray = Array.isArray(event.attendees) ? event.attendees : [event.attendees];
      const volunteersArray = Array.isArray(event.volunteers) ? event.volunteers : [event.volunteers];
      const startDate = moment(event.start).subtract(1, 'hours').format('YYYY-MM-DDTHH:mm');
      const endDate = moment(event.end).subtract(1, 'hours').format('YYYY-MM-DDTHH:mm');
      setLocalFormData({
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
      setOpenEditDialog(true);
    };
    

    return (
      <LayoutProfiles profile='admin' selected='Eventos'>
      <ToastContainer />
      <ButtonCreate text='Crear evento' handleCreate={handleEventCreate} />

        <div className={classes.calendarContainer}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleSelect}
            onSelectEvent={handleEventClick}
            views={['month', 'week', 'day']}
            selectable={true}
            step={15}
            timeslots={4}
            className='calendar'
          />
        </div>

        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Añadir Evento</DialogTitle>
          <DialogContent>{renderTextFieldComponents()}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)} color="primary">
              Volver
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Agregar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Editar Evento</DialogTitle>
          <DialogContent>{renderTextFieldComponents()}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="primary">
              Volver
            </Button>
            <Button onClick={handleEventEdit} color="primary">
              Guardar
            </Button>
            <Button onClick={handleEventDelete} color="secondary">
              Borrar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
          <DialogTitle>¿Estás seguro que quieres borrar?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

      </LayoutProfiles>
    );
  };

  return <AdminEvents />;
}

export default AdminEvents;
