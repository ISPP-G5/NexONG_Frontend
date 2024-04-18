import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import { ToastContainer, toast } from 'react-toastify';
import useToken from '../../components/useToken';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const localizer = momentLocalizer(moment);

const FamilyCalendar = () => {
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
                setCurrentUser({ familyId: userResponse.family });
        
                const studentResponse = await fetchData('student/', student => student.family === currentUser.familyId);
                if (studentResponse) {
                    setStudentFamily(studentResponse.map(student => student.id));
        
                    const eventResponse = await fetchData('event/', activity => 
                        moment(activity.start_date).isAfter(moment()) &&
                        activity.attendees.some(attendee => studentFamily.includes(attendee))
                    );
                    setActivities(prevActivities => [...prevActivities.filter(event => event.lesson), ...mapActivities(eventResponse, false)]);

                    const lessonEventResponse = await fetchData('lesson-event/', activity => 
                        moment(activity.start_date).isAfter(moment()) && 
                        activity.attendees.some(attendee => studentFamily.includes(attendee))
                    );
                    setActivities(prevActivities => [...prevActivities.filter(event => !event.lesson), ...mapActivities(lessonEventResponse, true)]);
        
                    const lessonResponse = await fetchData('lesson/', activity => 
                        activity.students.some(student =>  studentFamily.includes(student))
                    );
                    setActivities(prevActivities => [...prevActivities, ...mapActivities(lessonResponse, true)]);

                }
            }else{
                toast.error('No se ha podido cargar la información de la familia');
            }
        };

        fetchAndSetActivities();
    }, [userId, currentUser.familyId]);

    return (
        <LayoutProfiles profile={'familia'} selected={'Calendario'}>
        <ToastContainer />
        <Calendar
            localizer={localizer}
            events={activities}
            startAccessor="start"
            endAccessor="end"
            className='calendar'            
        />       
        </LayoutProfiles>
        
    );
};

export default FamilyCalendar;