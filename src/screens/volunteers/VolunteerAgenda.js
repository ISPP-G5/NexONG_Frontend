import React, { useEffect, useState } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogActions ,makeStyles }from '@material-ui/core';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import 'moment/locale/es';
import Globalize from 'globalize';
import axios from 'axios';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import { ToastContainer, toast } from 'react-toastify';
import useToken from '../../components/useToken';

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

const VolunteerAgenda = () => {
    Globalize.culture('es');
    const localizer = globalizeLocalizer(Globalize);
    const [token, updateToken] = useToken();
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };
    const [activities, setActivities] = useState([]);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [currentUser, setCurrentUser] = useState({
      volunteerId: ''
    });
    const classes = useStyles();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [schedules, setSchedules] = useState([]);
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
        const isLesson = type !== 'event' && type !== 'lesson-event'
        
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
                        max_attendees: activity.max_attendees,
                        start: startDate,
                        end: endDate,
                        type: type,
                        lesson: activity.lesson,
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
                    capacity: activity.capacity,
                    is_morning_lesson: activity.is_morning_lesson,
                    educator: activity.educator,
                    students: activity.students,
                    type: type,
                    start: new Date(start),
                    end: new Date(end),
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
          };
        
        fetchAndSetActivities();
        console.log(activities);
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
    const EventColor = '#ccff66'
    const eventStyleGetter = (event) => {
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
  };
  


    return (
        <LayoutProfiles profile={'voluntario'} selected={'Agenda'}>
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
                  setSelectedEvent(event);
                  setShowRegisterForm(true);
                }}
                eventPropGetter={eventStyleGetter}
            />
            <div className='legendContainer'>
            <div className='legend' style={{ backgroundColor: lessonColor, color: 'white'}}>Lección</div>
                <div className='legend' style={{ backgroundColor: lessonEventColor, color: 'white'}}>Excursión</div>
                <div className='legend' style={{ backgroundColor: EventColor, color: 'white'}}>Evento</div>
                <div className='legend' style={{ backgroundColor: 'purple', color: 'white'}}>Participas</div>
            </div> 
        </div> 

        {showRegisterForm && (
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

export default VolunteerAgenda;

