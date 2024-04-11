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
import useToken from '../../components/useToken';
import { ClassSharp } from '@material-ui/icons';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const token = localStorage.getItem('accessToken');

const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};
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
  const [token, updateToken] = useToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
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
    educators: [],
    educatorId: '',
    lesson: '',
    start_date: '',
    end_date: '',
    date: '',
    time: '',

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
    if (value.length === 0) {
      return null;
    }
  
    return (
      <div style={{ marginBottom: '1rem' }}>
        <label style={labelStyle}>{label}</label>
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
    const [lessons, setLessons] = useState([]);
    const [selectedEducatorId, setSelectedEducatorId] = useState('');
    const [educators, setEducators] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openAddLessonEventDialog, setOpenAddLessonEventDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openEditLessonEventDialog, setOpenEditLessonEventDialog] = useState(false);
    const [openMeetingDialog, setMeetingDialog] = useState(false);
    const [editEvent, setEditEvent] = useState(null);
    const [editLessonEvent, setEditLessonEvent] = useState(null);

    const [volunteers, setVolunteers] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [confirmDeleteLessonEventOpen, setConfirmDeleteLessonEventOpen] = useState(false);
    const [lessonEvents, setLessonEvents] = useState([]);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [lessonEventToDelete, setLessonEventToDelete] = useState(null);
    const [isNewEvent, setIsNewEvent] = useState(true); 
    const [isNewLessonEvent, setIsNewLessonEvent] = useState(true);
    const [isLessonEvent, setIsLessonEvent] = useState(false);
    const [openNewDialog, setOpenNewDialog] = useState(false);
    const allEvents = [...events, ...meetings, ...lessonEvents];


    const handleCreateClick = ({ start }) => {
      clearLocalFormData();
      const selectedDate = moment(start).format('YYYY-MM-DDTHH:mm');
      setLocalFormData((prevState) => ({
        ...prevState,
        start_date: selectedDate,
        end_date: selectedDate
      }));
      setOpenNewDialog(true);
    };

    const handleLessonEventCreate = ({  }) => {
      // Open the lesson-event dialog here
      setOpenAddLessonEventDialog(true);
    };
    


    const clearLocalFormData = () => {
      setLocalFormData(initialFormData);
    };


    const handleSelect = ({ start }) => {
      clearLocalFormData();
      const selectedDate = moment(start).format('YYYY-MM-DDTHH:mm');
      setLocalFormData((prevState) => ({
        ...prevState,
        start_date: selectedDate,
        end_date: selectedDate
      }));
      setOpenNewDialog(true);

    };

    const handleEventCreate = ( {start} ) => {
      setOpenAddDialog(true);
  
    };


    const renderMeetingTextFieldComponents = () => {
      // Map student IDs to their full names
      const attendeeFullNames = localFormData.attendees.map((attendeeId) => {
        const student = students.find((student) => student.id === attendeeId);
        return student ? `${student.name} ${student.surname}` : '';
      });
    
      return (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Nombre de la reunión</label>
            <TextField
              value={localFormData.name}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Descripción</label>
            <TextField
              value={localFormData.description}
              InputProps={{ readOnly: true }}
              fullWidth
              multiline
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>

          <label style={labelStyle}>Fecha</label>

          <TextField

            value={localFormData.date}

            InputProps={{ readOnly: true }}

            fullWidth

          />

          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Hora</label>
            <TextField
              value={localFormData.time}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>Asistentes</label>
            <TextField
              value={attendeeFullNames.join(', ')}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </div>
        </>
      );
    };
    const renderLessonEventTextFieldComponents = () => {
      return (
        <>
          {renderTextFieldComponent('Nombre de la actividad', localFormData.name, (value) => setLocalFormData({ ...localFormData, name: value }))}
          {renderTextFieldComponent('Descripción', localFormData.description, (value) => setLocalFormData({ ...localFormData, description: value }))}
          {renderTextFieldComponent('Lugar', localFormData.place, (value) => setLocalFormData({ ...localFormData, place: value }))}
          {renderTextFieldComponent('Precio', localFormData.price, (value) => setLocalFormData({ ...localFormData, price: value}), 'number')}
          {renderTextFieldComponent('Máximo Voluntarios', localFormData.max_volunteers, (value) => setLocalFormData({ ...localFormData, max_volunteers: value }), 'number')}
          {renderTextFieldComponent('Fecha Inicio', localFormData.start_date, (value) => setLocalFormData({ ...localFormData, start_date: value }), 'datetime-local')}
          {renderTextFieldComponent('Fecha fin', localFormData.end_date, (value) => setLocalFormData({ ...localFormData, end_date: value }), 'datetime-local')}
          <MultiSelect
              label="Alumnos que asisten"
              options={students}
              value={localFormData.attendees}
              readOnly={true}
              placeholder="Seleccione los alumnos que asisten"
            />

          <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Lección</label>
          <Select
          value={localFormData.lessonId || ''}
          onChange={(e) => {
            const selectedLessonId = e.target.value;
            setLocalFormData({ ...localFormData, lessonId: selectedLessonId });
          }}
          fullWidth
        >
          {lessons.map((lesson) => (
            <MenuItem key={lesson.id} value={lesson.id}>
              {lesson.name}
            </MenuItem>
          ))}
        </Select>

        </div>


          <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Educador</label>
<Select
  multiple // Enable multiple selections
  value={localFormData.educatorId || []} // Ensure a default value is set as an array
  onChange={(e) => {
    const selectedEducatorIds = e.target.value; // Use target.value to get the array of selected IDs
    const selectedEducators = educators.filter(educator => selectedEducatorIds.includes(educator.id));
    setLocalFormData({ ...localFormData, educatorId: selectedEducatorIds });
    setLocalFormData(prevState => ({ 
      ...prevState, 
      educators: selectedEducators 
    }));
  }}
  fullWidth
>
  {educators.map((educator) => {
    // Find the user corresponding to the educatorId
    const user = users.find((user) => user.id === educator.id);
    // Display the educator's name if found
    if (user) {
      return (
        <MenuItem key={user.id} value={user.id}>
          {`${user.first_name} ${user.last_name}`}
        </MenuItem>
      );
    } else {
      return null; // Return null if user not found (handle this case as per your requirement)
    }
  })}
</Select>
          </div>
        </>
      );
    };

        
    const [recurringEvent, setRecurringEvent] = useState(false);
    const [recurrenceFrequency, setRecurrenceFrequency] = useState('weekly'); // Default to weekly
    const [numOccurrences, setNumOccurrences] = useState(1);
    

    const renderTextFieldComponents = () => {
      if (isNewEvent) {
        return (
          <>
            {renderTextFieldComponent('Nombre del evento', localFormData.name, (value) => setLocalFormData({...localFormData, name: value }))}
            {renderTextFieldComponent('Descripción', localFormData.description, (value) => setLocalFormData({...localFormData, description: value }))}
            {renderTextFieldComponent('Lugar', localFormData.place, (value) => setLocalFormData({...localFormData, place: value }))}
            {renderTextFieldComponent('Precio', localFormData.price, (value) => setLocalFormData({...localFormData, price: value}), 'number')}
            {renderTextFieldComponent('Máximo Voluntarios', localFormData.max_volunteers, (value) => setLocalFormData({...localFormData, max_volunteers: value }), 'number')}
            {renderTextFieldComponent('Máximo asistentes', localFormData.max_attendees, (value) => setLocalFormData({...localFormData, max_attendees: value }), 'number')}
            {renderTextFieldComponent('Fecha Inicio', localFormData.start_date, (value) => setLocalFormData({...localFormData, start_date: value }), 'datetime-local')}
            {renderTextFieldComponent('Fecha fin', localFormData.end_date, (value) => setLocalFormData({...localFormData, end_date: value }), 'datetime-local')}
            {recurringEvent && renderTextFieldComponent('Número de ocurrencias', numOccurrences, setNumOccurrences, 'number')}

{isNewEvent && ( // Conditionally render the button for new events only
        <Button variant="outlined" color="primary" onClick={() => setRecurringEvent(!recurringEvent)}>
        {recurringEvent ? 'Crear Evento Singular' : 'Crear Evento Recurrente'}
      </Button>
    )}
          </>
        );
      } else {
        return (
          <>
            {renderTextFieldComponent('Nombre del evento', localFormData.name, (value) => setLocalFormData({...localFormData, name: value }))}
            {renderTextFieldComponent('Descripción', localFormData.description, (value) => setLocalFormData({...localFormData, description: value }))}
            {renderTextFieldComponent('Lugar', localFormData.place, (value) => setLocalFormData({...localFormData, place: value }))}
            {renderTextFieldComponent('Precio', localFormData.price, (value) => setLocalFormData({...localFormData, price: value}), 'number')}
            {renderTextFieldComponent('Máximo Voluntarios', localFormData.max_volunteers, (value) => setLocalFormData({...localFormData, max_volunteers: value }), 'number')}
            {renderTextFieldComponent('Máximo asistentes', localFormData.max_attendees, (value) => setLocalFormData({...localFormData, max_attendees: value }), 'number')}
            {renderTextFieldComponent('Fecha Inicio', localFormData.start_date, (value) => setLocalFormData({...localFormData, start_date: value }), 'datetime-local')}
            {renderTextFieldComponent('Fecha fin', localFormData.end_date, (value) => setLocalFormData({...localFormData, end_date: value }), 'datetime-local')}
            
            <MultiSelect
              label="Alumnos que asisten"
              options={students}
              value={localFormData.attendees}
              readOnly={true}
            />

          </>
        );
      }
    };
    

    useEffect(() => {
      axios
        .get(`${API_ENDPOINT}event/`, config)
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
        .get(`${API_ENDPOINT}volunteer/`, config)
        .get(`${API_ENDPOINT}volunteer/`, config)
        .then((response) => {
          console.log('response volunteers:', response.data);
          setVolunteers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching volunteers:', error);
        });
axios
  .get(`${API_ENDPOINT}meeting/`, config)
  .then((response) => {
    console.log('response asambleas:', response.data);
    const formattedMeetings = response.data.map((meeting) => ({
      id: meeting.id,
      title: meeting.name,
      description: meeting.description,
      time: meeting.time,
      start: new Date(meeting.date), // Combine date and time
      attendees: meeting.attendees,
      url: meeting.url,
      type: 'meeting',
      
    }));
    console.log('formattedMeetings:', formattedMeetings);
    
    // Add a minimum duration to each meeting event (e.g., 1 hour)
    const formattedMeetingsWithDuration = formattedMeetings.map((meeting) => ({
      ...meeting,
      end: new Date(meeting.start.getTime() + (60 * 60 * 1000)), // Add 1 hour to the start time
      
    }));
    
    setMeetings(formattedMeetingsWithDuration);
  })
  .catch((error) => {
    console.error('Error fetching meetings:', error);
  });

      
      

      axios
        .get(`${API_ENDPOINT}student/`, config)
        .then((response) => {
          console.log('response students:', response.data);
          setStudents(response.data);
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
        });
      axios
        .get(`${API_ENDPOINT}lesson/`, config)
        .then((response) => {
          setLessons(response.data);
          console.log('response lessons:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching lessons:', error);
        });
        axios
        .get(`${API_ENDPOINT}educator/`, config)
        .then((response) => {
          console.log('response educators:', response.data);
          setEducators(response.data);
        })
        .catch((error) => {
          console.error('Error fetching educators:', error);
        });
      axios
        .get(`${API_ENDPOINT}user/`, config)
        .then((response) => {
          console.log('response users:', response.data);
          setUsers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
      
      
      axios
        .get(`${API_ENDPOINT}lesson-event/`, config)
        .then((response) => {
          const formattedLessonEvents = response.data.map((event) => ({
            id: event.id,
            title: event.name,
            description: event.description,
            place: event.place,
            lesson: event.lesson,
            max_volunteers: event.max_volunteers,
            price: event.price,
            attendees: event.attendees,
            volunteers: event.volunteers,
            educators: event.educators,
            start: new Date(event.start_date),
            end: new Date(event.end_date),
            type: 'lesson-event',
          }));
          console.log('formattedLessonEvents:', formattedLessonEvents);
          
          setLessonEvents(formattedLessonEvents);
        })
        .catch((error) => {
          console.error('Error fetching lesson-events:', error);
        });

      axios
        .get(`${API_ENDPOINT}user/`, )
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
      const promises = [];
    
      for (let i = 0; i < numOccurrences; i++) {
        const eventData = {
          ...localFormData,
          start_date: selectedStartDate.format('YYYY-MM-DDTHH:mm'),
          end_date: moment(selectedStartDate)
            .add(moment(localFormData.end_date).diff(moment(localFormData.start_date)), 'milliseconds')
            .format('YYYY-MM-DDTHH:mm'),
        };
    
        // Push each axios.post promise into the promises array
        promises.push(
          axios.post(`${API_ENDPOINT}event/`, eventData, config)
        );
    
        // Move to the next occurrence
        selectedStartDate.add(1, 'weeks');
      }
    
      // Wait for all promises to resolve
      Promise.all(promises)
        .then((responses) => {
          // Extract the newly created events from the responses
          const newEvents = responses.map((response) => {
            const eventData = response.data;
            return {
              id: eventData.id,
              title: eventData.name,
              description: eventData.description,
              place: eventData.place,
              max_volunteers: eventData.max_volunteers,
              max_attendees: eventData.max_attendees,
              price: eventData.price,
              attendees: eventData.attendees,
              volunteers: eventData.volunteers,
              start: new Date(eventData.start_date),
              end: new Date(eventData.end_date),
            };
          });
    
          // Update the events state with the new events
          setEvents((prevEvents) => [...prevEvents, ...newEvents]);
    
          // Show success message and close the dialog
          toast.success('Eventos creados con éxito');
          setOpenAddDialog(false);
        })
        .catch(handleErrorResponse);
    };
    
    const handleLessonEvent = () => {
      console.log('Educators:', localFormData.educators);
      console.log('Lesson:', localFormData.lessonId);
      
      if (!localFormData.name || !localFormData.description || !localFormData.place || !localFormData.start_date || !localFormData.end_date || !localFormData.max_volunteers || !localFormData.price || !localFormData.educators || localFormData.educators.length === 0) {
        toast.error('Por favor, rellene todos los campos y seleccione al menos un educador.');
        return;
      }
      if (localFormData.end_date < localFormData.start_date) {
        toast.error('La fecha final no puede ser anterior a la fecha inicial.');
        return;
      }

      if (localFormData.max_volunteers <1) {
        toast.error('Los voluntarios no pueden ser menos de 1.');
        return;
      }
      if (localFormData.price < 0) {
        toast.error('El precio debe ser 0€ o más.');
        return;
      }
      
    
      axios
        .post(`${API_ENDPOINT}lesson-event/`, { 
          ...localFormData, 
          lesson: localFormData.lessonId, // Include lesson ID
          educators: localFormData.educators.map(educator => educator.id) // Include only the IDs of selected educators
        }, config)
        .then((response) => {
          console.log('Response of post:', response.data);
          toast.success('Lesson-Event creado con éxito');
  
          const newLessonEvent = {
            id: response.data.id,
            title: localFormData.name,
            description: localFormData.description,
            place: localFormData.place,
            max_volunteers: localFormData.max_volunteers,
            price: localFormData.price,
            volunteers: localFormData.volunteers,
            lesson: localFormData.lessonId, // Include lesson ID
            educators: localFormData.educators.map(educator => educator.id), // Include only the IDs of selected educators
            start: new Date(localFormData.start_date),
            end: new Date(localFormData.end_date),
          };
    
          setLessonEvents([...lessonEvents, newLessonEvent]);
          setOpenAddDialog(false);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const { data } = error.response;
            // Update state with backend validation errors
            if (data && data.detail) {
              toast.error(data.detail);
            } else if (data && data.start_date) {
              toast.error('Error: la fecha de inicio no puede ser en el pasado.');
            } else if (data && data.end_date) {
              toast.error('Error: la fecha de fin no puede ser anterior o igual a la de inicio.');
            }  else {
              toast.error('Ha ocurrido un error al crear la actividad.');
            }
          } else {
            console.error('Error creando actividad:', error);
          }
        }
      );

    };
    

    const handleSubmit = () => {
      if (recurringEvent) {
        handleRecurringEvent();
      } else if (isLessonEvent) {
        handleLessonEvent();
      } else {
        if ( localFormData.end_date < localFormData.start_date) {
          toast.error('La fecha final no puede ser anterior a la fecha inicial.');
          return;
        } 
        if (localFormData.start_date < new Date()) {
          // Start date is in the past
          toast.error('La fecha de inicio no puede ser en el pasado.');
          return;
        }
        if (localFormData.price < 0) {
          toast.error('El precio debe ser 0€ o más.');
          return;
        }
        if (localFormData.max_volunteers <1) {
          toast.error('Los voluntarios no pueden ser menos de 1.');
          return;
        }
        if (localFormData.max_attendees < 1) {
          toast.error('Los asistentes no pueden ser menos de 1.');
          return;
        }
        

        if (!localFormData.name || !localFormData.description || !localFormData.place || !localFormData.start_date || !localFormData.end_date || !localFormData.max_attendees || !localFormData.max_volunteers || !localFormData.volunteers || !localFormData.attendees || !localFormData.price) {
          toast.error('Por favor, rellene todos los campos.');
          return;
        }
        
        

        axios
          .post(`${API_ENDPOINT}event/`, localFormData, config)
          .then((response) => {
            console.log('Response of post:', response.data);
            toast.success('Evento creado con éxito');
    
            const newEvent = {
              id: response.data.id,
              title: localFormData.name,
              description: localFormData.description,
              place: localFormData.place,
              max_volunteers: localFormData.max_volunteers,
              max_attendees: localFormData.max_attendees,
              price: localFormData.price,
              attendees: localFormData.attendees,
              volunteers: localFormData.volunteers,
              start: new Date(localFormData.start_date),
              end: new Date(localFormData.end_date),
            };
    
            setEvents([...events, newEvent]);
            setOpenAddDialog(false);
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              const { data } = error.response;
              // Update state with backend validation errors
              if (data && data.detail) {
                toast.error(data.detail);
              } else if (data && data.start_date) {
                toast.error('Error: la fecha de inicio no puede ser en el pasado.');
              } else if (data && data.end_date) {
                toast.error('Error: la fecha de fin no puede ser anterior o igual a la de inicio.');
              }  else {
                toast.error('Ha ocurrido un error al crear la clase.');
              }
            } else {
              console.error('Error creating event:', error);
            }
          });
            
        }};

      
      const handleLessonEventEdit = () => {
        if (editLessonEvent) {
          const updatedLessonEventData = {
            ...editLessonEvent,
            name: localFormData.name,
            description: localFormData.description,
            place: localFormData.place,
            max_volunteers: localFormData.max_volunteers,
            price: localFormData.price,
            start_date: localFormData.start_date,
            end_date: localFormData.end_date,
            lesson: localFormData.lessonId,
            educators: localFormData.educatorId,
          };
          console.log('updatedLessonEventData:', updatedLessonEventData);
          axios
          .put(`${API_ENDPOINT}lesson-event/${editLessonEvent.id}/`, updatedLessonEventData)
          
          .then((response) => {
            console.log('Response of put:', response.data);
            const updatedLessonEvent = response.data;
            setLessonEvents(prevLessonEvents =>
              prevLessonEvents.map(lessonEvent => lessonEvent.id === updatedLessonEvent.id ? updatedLessonEvent : lessonEvent)
            );
            setOpenEditLessonEventDialog(false);
            setIsNewLessonEvent(true); // Set isNewEvent to false when editing an existing event

            toast.success('Actividad actualizada correctamente');
          })
          .catch((error) => {
            if (!localFormData.name || !localFormData.description || !localFormData.place || !localFormData.start_date || !localFormData.end_date  || !localFormData.max_volunteers || !localFormData.price) {
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
              } 
            } else {
              console.error('Error updating event:', error);
              toast.error('Ha ocurrido un error al actualizar el evento.');
            }
          });
        }
        
      }
      const handleLessonEventDelete = () => {
        if (editLessonEvent) {
          setLessonEventToDelete(editLessonEvent);
          setConfirmDeleteLessonEventOpen(true);
        };
      }
      const handleConfirmDeleteLessonEvent = () => {
        if (lessonEventToDelete) {
          axios
            .delete(`${API_ENDPOINT}lesson-event/${lessonEventToDelete.id}/`)
            .then(() => {
              setLessonEvents(lessonEvents.filter((lessonEvent) => lessonEvent.id !== lessonEventToDelete.id));
              setOpenEditLessonEventDialog(false);
              setIsNewLessonEvent(true); // Set isNewEvent to false when editing an existing event
              toast.success('Actividad eliminada correctamente');
              setConfirmDeleteLessonEventOpen(false);
              setLessonEventToDelete(null);
            })
            .catch((error) => {
              console.error('Error deleting lesson-event:', error);
              toast.error('Ha ocurrido un error al eliminar el evento.');
            });
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
            price: localFormData.price,
            attendees: localFormData.attendees,
            volunteers: localFormData.volunteers,
            start_date: localFormData.start_date,
            end_date: localFormData.end_date,
          };
    
        axios
          .put(`${API_ENDPOINT}event/${editEvent.id}/`, updatedEventData, config)
          .then((response) => {
            const updatedEvent = response.data;
            setEvents(prevEvents =>
              prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
            );
            setOpenEditDialog(false);
            setIsNewEvent(true); // Set isNewEvent to false when editing an existing event

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
          .delete(`${API_ENDPOINT}event/${eventToDelete.id}/`, config)
          .then(() => {
            setEvents(events.filter((event) => event.id !== eventToDelete.id));
            setOpenEditDialog(false);
            setIsNewEvent(true); // Set isNewEvent to false when editing an existing event

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
      // Check if it's a meeting event
      
      if (event.type === 'meeting') {
        // Display the information without editing
        const attendeesArray = Array.isArray(event.attendees) ? event.attendees : [event.attendees];

        setLocalFormData({
          name: event.title,
          description: event.description,
          attendees: attendeesArray,
          date: event.start.toISOString().split('T')[0],
          time: event.time

        });
       setMeetingDialog(true); // Open the dialog to display meeting information
      } else if (event.type === 'lesson-event') {
        setIsNewLessonEvent(false); // Set isNewEvent to false when editing an existing event
        setEditLessonEvent(event);
        const attendeesArray = Array.isArray(event.attendees) ? event.attendees : [event.attendees];
        const volunteersArray = Array.isArray(event.volunteers) ? event.volunteers : [event.volunteers];
        const startDate = moment(event.start).subtract(1, 'hours').format('YYYY-MM-DDTHH:mm');
        const endDate = moment(event.end).subtract(1, 'hours').format('YYYY-MM-DDTHH:mm');
        const educatorsArray = Array.isArray(event.educators) ? event.educators : [event.educators];
                // Find the lesson object by id and get its name
        

        setLocalFormData({
          name: event.title,
          description: event.description,
          place: event.place,
          max_volunteers: event.max_volunteers,
          max_attendees: event.max_attendees,
          price: event.price,
          attendees: attendeesArray,
          volunteers: volunteersArray,
          educatorId: event.educators,
          lessonId: event.lesson,
          educators: educatorsArray,
          start_date: startDate,
          end_date: endDate,
        });
        setOpenEditLessonEventDialog(true);
        console.log('activida d editar:', event);
      
      }

      
      
      else {
        // For non-meeting events, proceed with editing
        setIsNewEvent(false); // Set isNewEvent to false when editing an existing event
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


      }
    };
    
    

    return (
      <LayoutProfiles profile='admin' selected='Eventos'>
      <ToastContainer />
      <ButtonCreate text='Crear evento' handleCreate={handleCreateClick} />

        <div className={classes.calendarContainer}>
            <Calendar
      localizer={localizer}
      events={allEvents}
      startAccessor="start"
      endAccessor="end"
      onSelectSlot={handleCreateClick}
      onSelectEvent={handleEventClick}
      views={['month', 'week', 'day']}
      selectable={true}
      step={60} // Decreased step for finer granularity
      timeslots={1} // Only one row per hour
      className='calendar'
      eventPropGetter={(event, start, end, isSelected) => {
        let newStyle = {
          backgroundColor: "lightblue",
          color: 'black',
          borderRadius: "15px",
          border: "none"
        };

        if (event.type === 'meeting') {
          newStyle.backgroundColor = "yellow";
        } else if (event.type === 'lesson-event') {
          newStyle.backgroundColor = "green";
        } else if (event.type === 'event') {
          newStyle.backgroundColor = "red";
        }

        return {
          className: "",
          style: newStyle
        };
      }}
    />


        </div>

              <Dialog open={openNewDialog} onClose={() => setOpenNewDialog(false)}>
        <DialogActions>
          <Button onClick={handleEventCreate} color="primary">
            Evento
          </Button>
          <Button onClick={handleLessonEventCreate} color="primary">
            Actividad
          </Button>
        </DialogActions>
      </Dialog>


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
        <Dialog open={openAddLessonEventDialog} onClose={() => setOpenAddLessonEventDialog(false)}>
          <DialogTitle>Añadir Actividad</DialogTitle>
          <DialogContent>{renderLessonEventTextFieldComponents()}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddLessonEventDialog(false)} color="primary">
              Volver
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Agregar
            </Button>
          </DialogActions>
        </Dialog>
        

        <Dialog open={openEditDialog} onClose={() => {
          setOpenEditDialog(false);
          setIsNewEvent(true); // Set isNewEvent to true when closing the edit dialog
          }}>
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

        <Dialog open={openEditLessonEventDialog} onClose={() => {
          setOpenEditLessonEventDialog(false);
          setIsNewLessonEvent(true); // Set isNewEvent to true when closing the edit dialog
          }}>
          <DialogTitle>Editar Actividad</DialogTitle>
          <DialogContent>{renderLessonEventTextFieldComponents()}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditLessonEventDialog(false)} color="primary">
              Volver
            </Button>
            <Button onClick={handleLessonEventEdit} color="primary">
              Guardar
            </Button>
            <Button onClick={handleLessonEventDelete} color="secondary">
              Borrar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={confirmDeleteLessonEventOpen} onClose={() => setConfirmDeleteOpen(false)}>
          <DialogTitle>¿Estás seguro que quieres borrar?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteLessonEventOpen(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDeleteLessonEvent} color="secondary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openMeetingDialog} onClose={() => setMeetingDialog(false)}>
        <DialogTitle>Ver Reunión</DialogTitle>
        <DialogContent>{renderMeetingTextFieldComponents()}</DialogContent>
        <DialogActions>
          <Button onClick={() => setMeetingDialog(false)} color="primary">
            Volver
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
