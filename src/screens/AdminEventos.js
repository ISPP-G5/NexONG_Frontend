import '../styles/styles.css';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, makeStyles } from '@material-ui/core';
import AdminLayout from '../components/AdminLayout';

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
    const classes = useStyles();
    const [events, setEvents] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editEvent, setEditEvent] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');

    const handleSelect = ({ start }) => {
      setEditEvent({ start, title: '', id: '' });
      setOpenAddDialog(true);
    };

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
    function renderTextFieldComponents() {
      return (
        <>
          <TextField
            label="Nombre del evento"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="Fecha"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            label="Hora"
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
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
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            {renderTextFieldComponents()}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)} color="primary">Not</Button>
            <Button onClick={handleEventAdd} color="primary">Add</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogContent>
            {renderTextFieldComponents()}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="primary">Not Edit</Button>
            <Button onClick={handleEventEdit} color="primary">Edit</Button>
            <Button onClick={handleEventDelete} color="secondary">Delete</Button>
          </DialogActions>
        </Dialog>
      </AdminLayout>
    );
  }
  return <AdminEvents />;

}

export default AdminEventos;