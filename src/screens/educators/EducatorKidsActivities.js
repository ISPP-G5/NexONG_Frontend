import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import ActivityCard from '../../components/ActivityCard';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
const token = localStorage.getItem('accessToken');

const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};


function EducatorKidsActivities() {

  const [kids, setKids] = useState([]);
  const [activities, setActivities] = useState([]);
  const [exits, setExits] = useState([]);


  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}student/`,config)
      .then((response) => {
        setKids(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
    axios
      .get(`${API_ENDPOINT}lesson-event/`,config)
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });

    axios
      .get(`${API_ENDPOINT}center-exit/`,config)
      .then((response) => {
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