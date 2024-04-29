import React, { useEffect, useState } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import 'moment/locale/es';
import Globalize from 'globalize';
import axios from 'axios';
import '../styles/styles.css';
import LayoutProfiles from './LayoutProfiles';
import { ToastContainer, toast } from 'react-toastify';
import useToken from './useToken';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

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
    const [studentFamily, setStudentFamily] = useState([]);
    const [lessonAttendance, setLessonAttendance] = useState([]);

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
        const isLesson = type === 'lesson'
        
        for (var i = 0; i < activities.length; i++) {
            var activity = activities[i];
            var startDate = new Date(activity.start_date)
            var endDate = new Date(activity.end_date)

            if (!isLesson) {
                res.push({
                        id: activity.id,
                        title: activity.name,
                        description: activity.description,
                        place: activity.place,
                        max_volunteers: activity.max_volunteers,
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
            }
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
                
                console.log(await fetchAndMapActivities('lesson-event/', 'lesson-event'));
                
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
                        setStudentFamily(studentFamily);
            
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
            const style = {
                backgroundColor: backgroundColor,
                borderRadius: '0px',
                opacity: 0.8,
                color: 'black',
                border: '0px',
                display: 'block'
            };
            return {
                style: {
                    backgroundColor
                }
            };
       }else if (profile === 'voluntario'){
        let backgroundColor;
        if (event.type === 'event') { 
            backgroundColor = EventColor;
            console.log(event.volunteers);
            if(event.volunteers.includes(currentUser.volunteerId)){
                backgroundColor = 'purple';
            }
        } else if (event.type === 'lesson-event') {
            console.log('evento de leccion');
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
                    <DialogActions>
                        <Button onClick={handleRegister} color="primary">
                        Sí
                        </Button>
                        <Button onClick={() => setShowRegisterForm(false)} color="secondary">
                        No
                        </Button>
                    </DialogActions>
                    </Dialog>
                )}
        </LayoutProfiles>
    );
};

export default CalendarCard;