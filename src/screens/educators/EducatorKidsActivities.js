import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import ActivityCard from '../../components/ActivityCard';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


function EducatorKidsActivities() {

  const [kids, setKids] = useState([]);
  const [activities, setActivities] = useState([]);
  const [exits, setExits] = useState([]);


  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}student/`)
      .then((response) => {
        console.log('students:', response.data);
        setKids(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
    axios
      .get(`${API_ENDPOINT}lesson-event/`)
      .then((response) => {
        console.log('activities:', response.data);
        setActivities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });

    axios
      .get(`${API_ENDPOINT}center-exit/`)
      .then((response) => {
        console.log('response exits:', response.data);
        setExits(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <LayoutProfiles profile={'educador'} selected={'Actividades'}>
      {activities.map((t, index) => (
          <ActivityCard 
            key={index} 
            activities={t}
            kids={kids}
            exits={exits}
          />
      ))}
    </LayoutProfiles>
  );
}

export default EducatorKidsActivities;