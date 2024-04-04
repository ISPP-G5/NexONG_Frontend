import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchData(API_ENDPOINT, status) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(API_ENDPOINT)
      .then(response => {
        setData(response.data.filter(u => u.status === status));
      })
      .catch(error => {
        console.error(error);
      });
  }, [API_ENDPOINT, status]);

  return data;
}

export function useFetchUsersByRole(API_ENDPOINT, role) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}user/`)
      .then((response) => {
        console.log('users:', response.data);
        setUsers(response.data.filter(user => user.role === role));
      })
      .catch((error) => {
        console.error('Error fetching families:', error);
      });
  }, [API_ENDPOINT, role]);

  return users;
}

export function useFetchFamilies(API_ENDPOINT) {
  const [families, setFamilies] = useState([]);

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
  }, [API_ENDPOINT]);

  return families;
}

export function useFetchStudents(API_ENDPOINT, status) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
    .get(`${API_ENDPOINT}student/`)
    .then((response) => {
      console.log('students:', response.data);
      const acceptedStudents = response.data.filter(student => student.status === status);
      setStudents(acceptedStudents);
    })
    .catch((error) => {
      console.error('Error fetching students:', error);
    });
  }, [API_ENDPOINT, status]);

  return students;
}

export function useFetchLessons(API_ENDPOINT) {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}lesson/`)
      .then((response) => {
        console.log('lessons:', response.data);
        setLessons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });
  }, [API_ENDPOINT]);

  return lessons;
}

export function useFetchStudentEvaluation(API_ENDPOINT) {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}student-evaluation/`)
      .then((response) => {
        console.log('evaluations:', response.data);
        setEvaluations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching evaluations:', error);
      });
  }, [API_ENDPOINT]);

  return evaluations;
}

export function useFetchSuggestions(API_ENDPOINT) {
  const[suggestions, setSuggestions] = useState([]);

  useEffect(()=> {
    axios
    .get(`${API_ENDPOINT}suggestion/`)
    .then((response) => {
      console.log('suggestions:', response.data);
      setSuggestions(response.data);
    })
    .catch((error) => {
      console.error('Error fetching suggestions:', error);
    });
  }, [API_ENDPOINT]);

  return suggestions;
}

export function useFetchMyAuths(API_ENDPOINT, userId) {
  const [auths, setAuths] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`${API_ENDPOINT}user/${userId}`);
        if (userResponse.data) {
          const newUser = {
            familyId: userResponse.data.family,
          };

          const studentsResponse = await axios.get(`${API_ENDPOINT}student/`);
          const myStudents = studentsResponse.data.filter(student => student.family === newUser.familyId);
          

          const studentIds = myStudents.map(student => student.id);

          const authsResponse = await axios.get(`${API_ENDPOINT}center-exit/`);
          const myAuths = authsResponse.data.filter(auth => studentIds.includes(auth.student));
          
          setAuths(myAuths);
        } else {
          console.error('No user found with the provided user ID.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [API_ENDPOINT, userId]); // Dependencies remain the same

  return auths;
}

export function useFetchNameStudent(API_ENDPOINT, userAuths) {
  const[studentNames, setStudentNames] = useState([]);
  useEffect(()=> {
    axios
    .get(`${API_ENDPOINT}student/`)
    .then((response) => {
      const mapaEstudiantes = new Map(response.data.map(s => [s.id, s.name+ " " + s.surname]));
      const nombres = userAuths.map(auth => mapaEstudiantes.get(auth.student)).filter(name => name !== undefined);
      setStudentNames(nombres);
    })
    .catch((error) => {
      console.error('Error fetching student names:', error);
    });
  }, [API_ENDPOINT, userAuths]);

  return studentNames;
}

export function useFetchNameEvent(API_ENDPOINT, userAuths) {
  const[eventNames, setEventNames] = useState([]);
  useEffect(()=> {
    axios
    .get(`${API_ENDPOINT}event/`)
    .then((response) => {
      const mapaEventos = new Map(response.data.map(e => [e.id, e.name]));
      const nombres = userAuths.map(auth => mapaEventos.get(auth.lesson_event)).filter(name => name !== undefined);
      setEventNames(nombres);
    })
    .catch((error) => {
      console.error('Error fetching event names:', error);
    });
  }, [API_ENDPOINT, userAuths]);

  return eventNames;
}