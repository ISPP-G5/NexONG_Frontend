import '../styles/styles.css';
import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


const families = [
    {
      name: 'Family 1',
      info: 'Some information',
      kids: [
        { name: 'Kid 1', class: 'Class 1', evaluation: 'Good' },
      ],
    },
    {
      name: 'Family 2',
      info: 'Some information',
      kids: [
        { name: 'Kid 1', class: 'Class 1', evaluation: 'Good' },
        { name: 'Kid 2', class: 'Class 2', evaluation: 'Good' },
      ],
    },
    {
      name: 'Family 3',
      info: 'Some information',
      kids: [
        { name: 'Kid 1', class: 'Class 1', evaluation: 'Good' },
        { name: 'Kid 2', class: 'Class 2', evaluation: 'Good' },
        { name: 'Kid 3', class: 'Class 3', evaluation: 'Good' },
      ],
    },
  ];

  function AdminFamily() {

    const [families, setFamilies] = useState([]);
    const [kids, setKids] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
      axios
        .get(`${API_ENDPOINT}family/`)
        .then((response) => {
          console.log('families:', response.data);
          setFamilies(response.data);
        })
        .catch((error) => {
          console.error('Error fetching families:', error);
        });
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
        .get(`${API_ENDPOINT}lesson/`)
        .then((response) => {
          console.log('lessons:', response.data);
          setLessons(response.data);
        })
        .catch((error) => {
          console.error('Error fetching lessons:', error);
        });
      axios
        .get(`${API_ENDPOINT}student-evaluation/`)
        .then((response) => {
          console.log('evaluations:', response.data);
          setEvaluations(response.data);
        })
        .catch((error) => {
          console.error('Error fetching evaluations:', error);
        });
    }, []);
    
    return (
      <AdminLayout selected='Familias'>
        <div className='pantallas'>
          <a href='/AdminFamilias' className='selected-pantalla'>Nuestras familias</a>
          <a href='/AdminFamiliasSolicitudes'>Solicitudes</a>
        </div>
        {families.map((family, index) => (
          <div className='card-info' key={index}>
            <div className='family-info'>
              <p>Nombre familia: {family.name}</p>
              {/*family.info && <p>Information: {family.info}</p>*/}
              <p>Número de niños: {kids.filter(kid => kid.family === family.id).length}</p>
            </div>
            <div className='vertical-line'></div>
            <div className='kids-info'>
              {kids.filter(kid => kid.family === family.id).map((kid, kidIndex) => {
                const kidLesson = lessons.find(lesson => lesson.students.includes(kid.id));
                const kidEvaluation = evaluations.find(evaluation => evaluation.student === kid.id);
                return (
                  <div className='kid' key={kidIndex}>
                    <p>Nombre de niño: {kid.name} {kid.surname}</p>
                    <p>Fecha de nacimiento: {kid.birthdate} </p>
                    <p>Curso: {kid.current_education_year} </p>
                    <p>Clase: {kidLesson ? kidLesson.name : 'Not enrolled in any class'}</p>
                    <p>Evaluacion: {kidEvaluation ? kidEvaluation.grade : 'No evaluation'}</p>
                    {kid.status === 'EXPIRED' && <p style={{ color: 'red' }}>EXPIRED</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </AdminLayout>
    );
  }
export default AdminFamily;