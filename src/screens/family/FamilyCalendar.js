import React, { useEffect, useState } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import { makeStyles }from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import Globalize from 'globalize';
import spanish from 'globalize/lib/cultures/globalize.culture.es';
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
    
                    const eventResponse = await fetchData('event/', activity => 
                        moment(activity.start_date).isAfter(moment()) &&
                        activity.attendees.some(attendee => studentFamily.includes(attendee))
                    );
                    newActivities = [...newActivities, ...mapActivities(eventResponse, false)];
    
                    const lessonEventResponse = await fetchData('lesson-event/', activity => 
                        moment(activity.start_date).isAfter(moment()) && 
                        activity.attendees.some(attendee => studentFamily.includes(attendee))
                    );
                    newActivities = [...newActivities, ...mapActivities(lessonEventResponse, true)];
        
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
        />
        </div>  
        </LayoutProfiles>
        
    );
};

export default FamilyCalendar;