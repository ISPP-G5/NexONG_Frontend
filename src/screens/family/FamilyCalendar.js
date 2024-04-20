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

    const mapActivities = (activities, isLesson) => {
        return activities.map(activity => ({
            id: activity.id,
            title: activity.name,
            description: activity.description,
            place: activity.place,
            max_volunteers: activity.max_volunteers,
            start: new Date(activity.start_date),
            end: new Date(activity.end_date),
            lesson: isLesson ? activity.lesson : undefined,
            price: activity.price,
            educators: activity.educators,
            attendees: activity.attendees,
            volunteers: activity.volunteers,
            url: activity.url
        }));
    };

    useEffect(() => {
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
    
                    async function fetchAndMapActivities(url, isLesson) {
                        const response = await fetchData(url, activity => 
                            moment(activity.start_date).isAfter(moment()) &&
                            activity.attendees.some(attendee => studentFamily.includes(attendee))
                        );
                        return [...mapActivities(response, isLesson)];
                    }
                    
                    newActivities = [...newActivities, ...await fetchAndMapActivities('event/', false)];
                    newActivities = [...newActivities, ...await fetchAndMapActivities('lesson-event/', true)];
        
                    const lessonResponse = await fetchData('lesson/', activity => 
                        moment(activity.end_date).isAfter(moment()) && 
                        activity.students.some(student =>  studentFamily.includes(student))
                    );
                    newActivities = [...newActivities, ...mapActivities(lessonResponse, true)];
    
                    setActivities(newActivities);
                }
            }else{
                toast.error('No se ha podido cargar la información de la familia');
            }
        };
    
        fetchAndSetActivities();
    }, [userId]);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setOpen(true);
      };

      const eventStyleGetter = (event) => {
        let backgroundColor = '#C44D0D';
        if (event.max_volunteers){
            backgroundColor = '#0DC487'; 
        } else if (event.lesson) {
            backgroundColor = '#0DC48F'; 
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
        </div> 

        {open && (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Detalles del evento</DialogTitle>
            <DialogContent>
                {selectedEvent && (
                    <div>
                        <p><strong>Descripción: </strong>{selectedEvent.description}</p>
                        <p><strong>Comienzo: </strong>{selectedEvent.start.getDate()}/{selectedEvent.start.getMonth()}/{selectedEvent.start.getFullYear()}, {selectedEvent.start.getHours()}h</p>
                        <p><strong>Final: </strong>{selectedEvent.end.getDate()}/{selectedEvent.end.getMonth()}/{selectedEvent.end.getFullYear()}, {selectedEvent.end.getHours()}h</p>
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