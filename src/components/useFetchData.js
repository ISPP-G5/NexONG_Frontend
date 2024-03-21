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