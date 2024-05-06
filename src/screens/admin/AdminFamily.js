import '../../styles/styles.css';
import React, { useState, useEffect } from 'react';
import ShowType from '../../components/ShowAdminProfiles';
import { useFetchFamilies, useFetchLessons, useFetchStudentEvaluation, useFetchStudents } from '../../components/useFetchData';
import useToken from '../../components/useToken';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const pantallas = [
  {
    pantalla: 'Nuestras familias',
    link: '/admin/familias',
    selected: true,
  },
  {
    pantalla: 'Solicitudes',
    link: '/admin/familias/solicitudes',
    selected: false,
  }
];

function AdminFamily() {
  const [token, updateToken] = useToken();

  const families = useFetchFamilies(API_ENDPOINT, token);
  const students = useFetchStudents(API_ENDPOINT, 'ACEPTADO', token);
  const lessons = useFetchLessons(API_ENDPOINT, token);
  const evaluations = useFetchStudentEvaluation(API_ENDPOINT, token);

  const [kids, setKids] = useState([]);

  useEffect(() => {
    if (students.length > 0 && lessons.length > 0 && evaluations.length > 0) {
      const newKids = students.map(student => {
        const studentLessons = lessons
          .filter(lesson => lesson.students.includes(student.id))
          .map(lesson => lesson.name);
        const studentEvaluation = evaluations
          .find(evaluation => evaluation.student === student.id);

        return {
          ...student,
          lesson: studentLessons,
          evaluation: studentEvaluation ? studentEvaluation.grade : null
        };
      });

      setKids(newKids);
    }
  }, [students, lessons, evaluations]);
  
  return (
    <ShowType 
      data={families}
      type="Familias" 
      pantallas={pantallas} 
      kids={kids}
      request={false}
      trash={false}
    />
  );
}

export default AdminFamily;