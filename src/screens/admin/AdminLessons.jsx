import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  lessonBox: {
    width: 'calc(50% - 20px)',
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#d6eaf8',
    color: 'rgb(0, 0, 0)',
    display: 'inline-block',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    borderRadius: '10px',
    '&:nth-child(odd)': {
      clear: 'both',
    },
  },
  addLessonsButton: {
    float: 'right',
  },
  lessonsContainer: {
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  createLessonButton: {
    float: 'right',
    marginBottom: '10px',
  },
  deleteButton: {
    backgroundColor: '#f44336', 
    color: '#fff', 
    marginRight: '5px', 
  },
  editButton: {
    backgroundColor: '#2196f3', 
    color: '#fff', 
  },
}));

const AdminLessons = () => {
  const classes = useStyles();

  const [lessons, setLessons] = useState([
    { nombre: 'Clase 1', descripcion: 'Clase introducción', alumnos: 20, educador: 'Juan' },
    { nombre: 'Clase 2', descripcion: 'Clase desarrollo', alumnos: 15, educador: 'María' },
    { nombre: 'Clase 3', descripcion: 'Clase avanzada', alumnos: 18, educador: 'Pedro' },
    { nombre: 'Clase 4', descripcion: 'Clase práctica', alumnos: 25, educador: 'Ana' },
  ]);

  const handleDeleteLesson = (index) => {
    const newLessonList = [...lessons];
    newLessonList.splice(index, 1);
    setLessons(newLessonList);
  };

  const handleEditLesson = (index) => {
  };

  const handleCreateLesson = () => {
  };

  return (
    <div className="App">
      <div className="main">
        <Button className={classes.createLessonButton} variant="contained" color="primary" onClick={handleCreateLesson}>
          Create New Lesson
        </Button>
        <div className={classes.lessonsContainer}>
          {lessons.map((lesson, index) => (
            <div key={index} className={classes.lessonBox}>
              <Typography variant="h6">Name: {lesson.nombre}</Typography>
              <Typography variant="body1">Description: {lesson.descripcion}</Typography>
              <Typography variant="body1">Students: {lesson.alumnos}</Typography>
              <Typography variant="body1">Educator: {lesson.educador}</Typography>
              <Button className={classes.deleteButton} onClick={() => handleDeleteLesson(index)}>Delete</Button>
              <Button className={classes.editButton} onClick={() => handleEditLesson(index)}>Edit</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLessons;



