import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import { ToastContainer } from 'react-toastify';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const localizer = momentLocalizer(moment);

const FamilyCalendar = () => {
    const [activities, setActivities] = useState([]);
    const [studentFamily, setStudentFamily] = useState({
        studentsId: []
    });
    const [currentUser, setCurrentUser] = useState({
        familyId: ''
    });
    const userId = parseInt(localStorage.getItem('userId'), 10);

    const fetchData = async (url, filterFunc) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}${url}`);
            return response.data.filter(filterFunc);
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
            const userResponse = await fetchData('auth/users/me/', data => data.family === currentUser.familyId);
            if (userResponse) {
                setCurrentUser({ familyId: userResponse.family });
        
                const studentResponse = await fetchData('student/', student => student.family === currentUser.familyId);
                if (studentResponse) {
                    setStudentFamily({ studentsId: studentResponse.id });
        
                    const eventResponse = await fetchData('event/', activity => moment(activity.start_date).isAfter(moment()) && activity.attendees.some(attendee => attendee === studentFamily.studentsId));
                    setActivities(prevActivities => [...prevActivities.filter(event => event.lesson), ...mapActivities(eventResponse, false)]);
        
                    const lessonEventResponse = await fetchData('lesson-event/', activity => moment(activity.start_date).isAfter(moment()) && activity.attendees.some(attendee => attendee === studentFamily.studentsId));
                    setActivities(prevActivities => [...prevActivities.filter(event => !event.lesson), ...mapActivities(lessonEventResponse, true)]);
        
                    const lessonResponse = await fetchData('lesson/', activity => moment(activity.start_date).isAfter(moment()) && activity.students.some(student => student === studentFamily.studentsId));
                    setActivities(prevActivities => [...prevActivities.filter(event => !event.lesson), ...mapActivities(lessonResponse, true)]);
                }
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