import React, { useEffect, useState } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DialogContent, DialogActions ,makeStyles }from '@material-ui/core';
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

const FamilyCalendar = () => {
    Globalize.culture('es');
    const localizer = globalizeLocalizer(Globalize);
    const [token, updateToken] = useToken();
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };
    const [activities, setActivities] = useState([]);
    const [studentFamily, setStudentFamily] = useState([]);
    const [currentUser, setCurrentUser] = useState({
        familyId: ''
    });
    const classes = useStyles();
    const userId = parseInt(localStorage.getItem('userId'), 10);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [schedules, setSchedules] = useState([]);

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

        // console.log("date:",date," hours:",hours," minutes:",minutes," seconds:",seconds)
    
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
        const isLesson = type !== 'event'
        
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
            console.log(start)
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
                    console.log(newActivities)
                }
            }else{
                toast.error('No se ha podido cargar la información de la familia');
            }
        };
    
        fetchAndSetActivities();
    }, [schedules]);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setOpen(true);
    };

    const lessonColor = '#3399ff'
    const lessonEventColor = '#ff66cc'
    const EventColor = '#ccff66'
    const eventStyleGetter = (event) => {
        let backgroundColor = '#C44D0D';
        if (event.max_volunteers){
            backgroundColor = '#0DC487'; 
        } else if (event.type === 'lesson') {
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
            style: style
        };
    };


    return (
        <LayoutProfiles profile={'familia'} selected={'Calendario'}>
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
                    handleEventClick(event);
                }}
                eventPropGetter={eventStyleGetter}
            />
            <div>
                <div className='prueba' backgroundColor={lessonColor}></div>
                <div className='prueba' backgroundColor={lessonEventColor}></div>
                <div className='prueba' backgroundColor={EventColor}></div>
            </div> 
        </div> 

        {open && (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Detalles de{selectedEvent.max_volunteers ? 'l evento' : ' la clase'}</DialogTitle>
            <DialogContent>
                {selectedEvent && (
                    <div>
                        <p><strong>Nombre: </strong>{selectedEvent.title}</p>
                        <p><strong>Descripción: </strong>{selectedEvent.description}</p>
                        {selectedEvent.max_volunteers ?  
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

        </LayoutProfiles>
        
    );
};

export default FamilyCalendar;