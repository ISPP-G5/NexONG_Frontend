import React, { useEffect, useState } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import 'moment/locale/es';
import Globalize from 'globalize';
import axios from 'axios';
import '../styles/styles.css';
import LayoutProfiles from './LayoutProfiles';
import { ToastContainer, toast } from 'react-toastify';
import useToken from './useToken';
import useStyles from './StylesCalendar';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const CalendarCard = ({ profile, selected }) => {
    Globalize.culture('es');
    const localizer = globalizeLocalizer(Globalize);
    const [token, updateToken] = useToken();
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    const [activities, setActivities] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [schedules, setSchedules] = useState([]);    
    const [currentUser, setCurrentUser] = useState({
        volunteerId: ''
      });
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [lessonAttendance, setLessonAttendance] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        event: null
    });
    

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
      }, []);
  

    const fetchData = async (url, filterFunc = () => true) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}${url}`, config);
            const data = response.data;
            if (Array.isArray(data)) {
                return data.filter(filterFunc);
            } else if (typeof data === 'object') {
                return filterFunc(data) ? data : null;
            } else {
                console.error('Data is not an array or object:', data);
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    };

    function setCustomTime(date, time) {
        const [hours, minutes, seconds] = time.split(':').map(Number)
    
        date.setHours(hours - 1)
        date.setMinutes(minutes)
        date.setSeconds(seconds)
    
        return date
    }
    
    const weekdays = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
    
    function getNextWeekday(date, weekday) {
        const targetWeekday = weekdays.indexOf(weekday)
        if (targetWeekday === -1) {
            throw new Error("Invalid weekday")
        }
    
        const nextDate = new Date(date)
        const currentWeekday = nextDate.getDay()
    
        let daysToAdd = targetWeekday - currentWeekday

        if (daysToAdd < 0) {
            daysToAdd += 7
        }

        if (daysToAdd !== 0) {
            nextDate.setDate(nextDate.getDate() + daysToAdd)
        }
    
        return nextDate
    }

    const mapActivities = (activities, type) => {
        if (type !== 'event' && type !== 'lesson' && type !== 'lesson-event') {
            throw new Error("Invalid activity type")
        }

        var res = []
        
        for (var i = 0; i < activities.length; i++) {
            var activity = activities[i];
            var startDate = new Date(activity.start_date)
            var endDate = new Date(activity.end_date)

            if (type === 'event' || type === 'lesson-event') {
                res.push({
                        id: activity.id,
                        title: activity.name,
                        description: activity.description,
                        place: activity.place,
                        max_volunteers: activity.max_volunteers,
                        max_attendees: activity.max_attendees,
                        start: startDate,
                        end: endDate,
                        type: type,
                        price: activity.price,
                        educators: activity.educators,
                        attendees: activity.attendees,
                        volunteers: activity.volunteers,
                        url: activity.url
                })
                continue
            }else if(type === 'lesson'){
                var schedule = schedules.find(schedule => schedule.lesson === activity.id)

                startDate = getNextWeekday(startDate, schedule.weekday)

                var start = setCustomTime(startDate, schedule.start_time)
                var end = setCustomTime(startDate, schedule.end_time)
                while (end < endDate) {
                    res.push({
                        id: activity.id,
                        title: activity.name,
                        description: activity.description,
                        place: activity.place,
                        max_volunteers: activity.max_volunteers,
                        start: new Date(start),
                        end: new Date(end),
                        type: type,
                        price: activity.price,
                        educators: activity.educators,
                        attendees: activity.attendees,
                        volunteers: activity.volunteers,
                        url: activity.url
                    })

                    startDate.setDate(startDate.getDate() + 7)
                    start = setCustomTime(startDate, schedule.start_time)
                    end = setCustomTime(startDate, schedule.end_time) 
                }
            }
        }

        return res
    };

    useEffect(() => {
        const fetchAndSetSchedule = async () => {
            const response = await fetchData('schedule/');
            if (response) {
                setSchedules(response);
            }
        };  
        fetchAndSetSchedule();
    }, []);

    useEffect(() => {
        if (schedules.length === 0) return

        const fetchAndSetActivities = async () => {
            if (profile === 'voluntario'){
                let newActivities = [];
    
                async function fetchAndMapActivities(url, type) {
                    const response = await fetchData(url, activity => 
                    moment(activity.start_date).isAfter(moment()) );
                    return [...mapActivities(response, type)];
                }
                        
                newActivities = [...newActivities, ...await fetchAndMapActivities('event/', 'event')];
                newActivities = [...newActivities, ...await fetchAndMapActivities('lesson-event/', 'lesson-event')];
                
                const lessonResponse = await fetchData('lesson/', activity => 
                moment(activity.end_date).isAfter(moment()));
                newActivities = [...newActivities, ...mapActivities(lessonResponse, 'lesson')];
                
                setActivities(newActivities);
            }else if(profile === 'familia'){
                const userResponse = await fetchData('auth/users/me/');
    
                if (userResponse) {
                    const familyId = userResponse.family;
                    setCurrentUser({ familyId: familyId });
            
                    const studentResponse = await fetchData('student/', student => student.family === familyId);
                    if (studentResponse) {
                        const studentFamily = studentResponse.map(student => student.id);
            
                        let newActivities = [];
        
                        async function fetchAndMapActivities(url, type) {
                            const response = await fetchData(url, activity => 
                                moment(activity.start_date).isAfter(moment()) &&
                                activity.attendees.some(attendee => studentFamily.includes(attendee))
                            );
                            return [...mapActivities(response, type)];
                        }
                        
                        newActivities = [...newActivities, ...await fetchAndMapActivities('event/', 'event')];
                        newActivities = [...newActivities, ...await fetchAndMapActivities('lesson-event/', 'lesson-event')];

                        const lessonResponse = await fetchData('lesson/', activity => 
                            moment(activity.end_date).isAfter(moment()) && 
                            activity.students.some(student =>  studentFamily.includes(student))
                        );
                        newActivities = [...newActivities, ...mapActivities(lessonResponse, 'lesson')];
        
                        setActivities(newActivities);
                    }
                }else{
                    toast.error('No se ha podido cargar la información de la familia');
                }
            }
        };
    
        fetchAndSetActivities();
    }, [schedules]);

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
          }else{
            const updatedVolunteers = [...selectedEvent.volunteers, currentUser.volunteerId];
          if (updatedVolunteers.length > selectedEvent.max_volunteers) {
            toast.error('El número de voluntarios excede el límite máximo permitido.');
            return;
          }
          console.log(selectedEvent);
            try {
                if (selectedEvent.type === 'event') {
                    await axios.put(`${API_ENDPOINT}event/${selectedEvent.id}/`, {
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
                }else if (selectedEvent.type === 'lesson-event') {
                    await axios.put(`${API_ENDPOINT}lesson-event/${selectedEvent.id}/`, {
                        id: selectedEvent.id,
                        name: selectedEvent.title,
                        description: selectedEvent.description,
                        place: selectedEvent.place,
                        max_volunteers: selectedEvent.max_volunteers,
                        start_date: selectedEvent.start,
                        end_date: selectedEvent.end,
                        lesson: selectedEvent.lesson,
                        price: selectedEvent.price,
                        educators: selectedEvent.educators,
                        attendees: selectedEvent.attendees,
                        volunteers: updatedVolunteers,
                        url: selectedEvent.url
                      }, config);
                }
                setShowRegisterForm(false);
                setTimeout(() => {
                    window.location.reload(true);
                }, 5000);
                toast.success('Se ha unido correctamente');
              } catch (error) {
                console.error('Error when registering the volunteer:', error);
                toast.error('Hubo un error al unirse a la clase.');
              }
          }
        } else if(selectedEvent.type === 'lesson'){
            if (lessonAttendance.some(attendance => attendance.lesson === selectedEvent.id && attendance.volunteer === currentUser.volunteerId)) {
                toast.error('Usted ya pertenece a esta lección.');
                setShowRegisterForm(false);
                return;
            } else {
                const newAttendance = {
                    lesson: selectedEvent.id,
                    volunteer: currentUser.volunteerId,
                    date: moment().format('YYYY-MM-DD')
                  };
                  try {
                    await axios.post(`${API_ENDPOINT}lesson-attendance/`, newAttendance, config);
                    setShowRegisterForm(false);
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 5000);
                    toast.success('Se ha unido correctamente, se une a todas las clases de esta lección.');
                  } catch (error) {
                    console.error('Error when registering the volunteer:', error);
                    toast.error('Hubo un error al unirse a la clase.');
                  }
            }
        }
      };

    const lessonColor = '#3399ff'
    const lessonEventColor = '#ff66cc'
    const EventColor = '#c34c0c'
    const eventStyleGetter = (event) => {
       if(profile === 'familia'){
            let backgroundColor;
            if (event.type === 'lesson') {
                backgroundColor = lessonColor; 
            } else if (event.type === 'lesson-event') {
                backgroundColor = lessonEventColor; 
            } else if (event.type === 'event') {
                backgroundColor = EventColor; 
            } 
            return {
                style: {
                    backgroundColor
                }
            };
       }else if (profile === 'voluntario'){
        let backgroundColor;
        if (event.type === 'event') { 
            backgroundColor = EventColor;
            if(event.volunteers.includes(currentUser.volunteerId)){
                backgroundColor = 'purple';
            }
        } else if (event.type === 'lesson-event') {
            backgroundColor = lessonEventColor; 
            if(event.volunteers.includes(currentUser.volunteerId)){
                backgroundColor = 'purple';
            }
        } else if (event.type === 'lesson') {
            backgroundColor = lessonColor; 
            if (lessonAttendance.some(attendance => attendance.lesson === event.id && attendance.volunteer === currentUser.volunteerId)) {
                backgroundColor = 'purple'; 
            }
        }
        return {
            style: {
                backgroundColor
            }
        };
    }
    };

    const handleDeleteVolunteer = async () => {
        try {
          let updatedVolunteers;
      
          if (deleteConfirmation.event.type === 'lesson-event' || deleteConfirmation.event.type === 'event') {

            console.log(deleteConfirmation.event);
            
            updatedVolunteers = deleteConfirmation.event.volunteers.filter(volunteer => volunteer !== currentUser.volunteerId);
      
            await axios.put(`${API_ENDPOINT}${deleteConfirmation.event.lesson ? 'lesson-event' : 'event'}/${deleteConfirmation.event.id}/`, {
                ...deleteConfirmation.event,
                volunteers: updatedVolunteers,
                name: deleteConfirmation.event.title,
                start_date: deleteConfirmation.event.start,
                end_date: deleteConfirmation.event.end,
            }, config);
      
          } else if (deleteConfirmation.event.type === 'lesson') {
            const attendanceId = lessonAttendance.find(attendance => attendance.lesson === deleteConfirmation.event.id && attendance.volunteer === currentUser.volunteerId).id;
            
            await axios.delete(`${API_ENDPOINT}lesson-attendance/${attendanceId}`, config);
          }
      
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
        <LayoutProfiles profile={profile} selected={selected}>
            <ToastContainer />
            <div className={classes.calendarContainer}>
                <Calendar
                    localizer={localizer}
                    events={activities}
                    startAccessor="start"
                    endAccessor="end"
                    className='calendar'
                    selectable={true}
                    onSelectEvent={(event) => {
                        if (profile === 'voluntario') {
                            setSelectedEvent(event);
                            setShowRegisterForm(true);
                        }else if(profile === 'familia'){
                            setSelectedEvent(event);
                            setOpen(true);
                        }
                    }}
                    eventPropGetter={eventStyleGetter}
                />
                <div className='legendContainer'>
                    <div className='legend' style={{ backgroundColor: lessonColor, color: 'white'}}>Lección</div>
                    <div className='legend' style={{ backgroundColor: lessonEventColor, color: 'white'}}>Excursión</div>
                    <div className='legend' style={{ backgroundColor: EventColor, color: 'white'}}>Evento</div>
                    {profile === 'voluntario' && <div className='legend' style={{ backgroundColor: 'purple', color: 'white'}}>Participas</div>}
                </div> 
            </div>

            {profile === 'familia' && open && (
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Detalles de{selectedEvent.max_volunteers ? 'l evento' : ' la clase'}</DialogTitle>
                <DialogContent>
                    {selectedEvent && (
                        <div>
                            <p><strong>Nombre: </strong>{selectedEvent.title}</p>
                            <p><strong>Descripción: </strong>{selectedEvent.description}</p>
                            {selectedEvent.type === 'event' || selectedEvent.type === 'lesson-event' ?  
                                    (<div>
                                        <p><strong>Comienzo: </strong>{selectedEvent.start.getDate()}/{selectedEvent.start.getMonth()+1}/{selectedEvent.start.getFullYear()}, {selectedEvent.start.getHours()}h</p>
                                        <p><strong>Final: </strong>{selectedEvent.end.getDate()}/{selectedEvent.end.getMonth()+1}/{selectedEvent.end.getFullYear()}, {selectedEvent.end.getHours()}h</p>
                                    </div>) 
                                : 
                                (<div>
                                    <p><strong>Comienzo: </strong>{selectedEvent.start.getDate()}/{selectedEvent.start.getMonth()+1}/{selectedEvent.start.getFullYear()}</p>
                                    <p><strong>Final: </strong>{selectedEvent.end.getDate()}/{selectedEvent.end.getMonth()+1}/{selectedEvent.end.getFullYear()}</p>
                                    <p><strong>Horario:</strong> {
                                        schedules.filter(schedule => schedule.lesson === selectedEvent.id).map(schedule => 
                                            <p>{schedule.weekday} de {schedule.start_time} a {schedule.end_time}</p>
                                        )
                                    }</p>
                                </div>) 
                        }
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
            )}

            {profile === 'voluntario' && showRegisterForm && (
                <Dialog open={showRegisterForm} onClose={() => setShowRegisterForm(false)}>
                    <DialogTitle>
                        {selectedEvent && selectedEvent.educator ? '¿Quieres unirte a esta clase?' : '¿Quieres unirte a este evento?'}
                    </DialogTitle>
                    <DialogContent>
                        {selectedEvent && <p>Nombre: {selectedEvent.title}</p>}
                        {selectedEvent && <p>Descripción: {selectedEvent.description}</p>}
                        {selectedEvent.type === 'event' && <p>Sitio: {selectedEvent.place}</p>}
                        {selectedEvent && <p>Fecha: {selectedEvent.start.toLocaleString()}</p>}
                        {selectedEvent.type === 'event' && <p>Precio: {selectedEvent.price}</p>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleRegister} color="primary">
                            Sí
                        </Button>
                        <Button onClick={() => setShowRegisterForm(false)} color="secondary">
                            No
                        </Button>
                        {(selectedEvent.type == 'event' || selectedEvent.type === 'lesson-event' && selectedEvent.volunteers.includes(currentUser.volunteerId) || 
                            (selectedEvent.type === 'lesson' && lessonAttendance.some(attendance => attendance.lesson === selectedEvent.id && attendance.volunteer === currentUser.volunteerId))) && (
                            <Button onClick={() => setDeleteConfirmation({ open: true, event: selectedEvent })} color="secondary">
                                Dejar de formar parte
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            )}

            {profile === 'voluntario' && deleteConfirmation.open && (
                <Dialog open={deleteConfirmation.open} onClose={() => setDeleteConfirmation({ open: false, event: null })}>
                <DialogTitle>Confirmar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas dejar de participar en esta actividad?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteVolunteer} color="primary">
                        Sí
                    </Button>
                    <Button onClick={() => setDeleteConfirmation({ open: false, event: null })} color="secondary">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            )}

        </LayoutProfiles>
    );
};

export default CalendarCard;
