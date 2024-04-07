import { useState, useEffect } from 'react';
import axios from 'axios';
 const token = localStorage.getItem('accessToken');
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
        console.error('Error fetching users:', error);
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
    .get(`${API_ENDPOINT}suggestion/`, {
    headers: {
      'Authorization': `Bearer ${token}`, 
    }
    })
    .then((response) => {
      console.log('suggestions:', response.data);
      setSuggestions(response.data);
    })
    .catch((error) => {
      console.error('Error fetching suggestions:', error);
    });
  }, [API_ENDPOINT]);

  return [suggestions,setSuggestions];
}