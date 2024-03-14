import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
import '../styles/styles.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const useStyles = makeStyles(() => ({
  addClassButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10%',
    marginTop: '2%',
    height: '10%',
    backgroundColor: '#fff',
    border: 'none',
    color: '#2196f3',
    fontSize: '2rem',
    cursor: 'pointer',
  },
  lessonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '2rem',
    gap: '2rem', // Adjust as needed
  },
}));

const Box = ({ lesson, index, handleDelete, users }) => {
  const onDeleteClick = () => {
    handleDelete(index);
  };
  const educator = users.find(user => user.id === lesson.educator);
  const morningLessonText = lesson.is_morning_lesson ? 'Sí' : 'No';
  

  return (
    <div className="box">
      <div className="clase">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="nombre-educador">
            <div><strong>Nombre:</strong> {lesson.name}</div>
            <div><strong>Descripción:</strong> {lesson.description}</div>
            <div><strong>Inicio:</strong> {lesson.start_date}</div>
            <div><strong>Fin:</strong> {lesson.end_date}</div>

            <div><strong>Capacidad:</strong> {lesson.capacity}</div>
            <div><strong>Educador Asociado:</strong> {educator ? educator.name : "No educator found"}</div>
            <div><strong>Nº Alumnos:</strong> {lesson.students ? lesson.students.length : 0}</div>

            <div><strong>Clase de Mañana:</strong> {morningLessonText}</div> {/* Display "Sí" or "No" based on is_morning_lesson */} </div>





          <EditIcon className="edit-fill" />
          <DeleteIcon className="trash" onClick={onDeleteClick} />
        </div>
      </div>
    </div>
  );
};

const AdminClases = () => {
  const classes = useStyles();
  const [lessons, setLessons] = useState([]);
  const [users, setUsers] = useState([]);
  

  const navigate = useNavigate();
  const handleDelete = (index) => {
    const updatedLessons = [...lessons];
    updatedLessons.splice(index, 1);
    setLessons(updatedLessons);
  };
  const handleCreateClassClick = () => {

    navigate('/adminCrearClase');
  
  };

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}lesson/`)
      .then((response) => {
        console.log('response:', response.data);
        setLessons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });
    axios
        .get(`${API_ENDPOINT}user/`)
        .then((response) => {
          console.log('response user:', response.data);
          setUsers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
  }, []);


  return (
    <AdminLayout selected='Clases'>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

      <button className={classes.addClassButton} onClick={handleCreateClassClick}>

        <AddCircleIcon fontSize='large' />

        Crear Clase

      </button>

      </div>

      <div className={classes.lessonsContainer} style={{ marginRight: '20rem' }}>
        {lessons.map((lesson, index) => (
          <Box key={index} index={index} lesson={lesson} handleDelete={handleDelete} users={users}/>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminClases;
