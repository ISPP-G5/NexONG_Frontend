import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
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
  profileText: {
   
    textDecoration: 'underline', 
    marginRight: theme.spacing(5),
  },
  profilePicture: {

    position: 'relative',

    top: theme.spacing(1),
    marginRight: theme.spacing(1),


    width: '62px',

    height: '62px',

    borderRadius: '50%',

    backgroundColor: '#D9D9D9',

  },
}));



const Box = () => {
  return (
    <div className="box">
      <div className="clase">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="nombre-educador">
            Nombre
            <br />
            <br />
            Educador Asociado
            <br />
            <br />
            Nº Alumnos
            <br />
            <br />
            Información
          </div>
          <EditIcon className="edit-fill" />
          <DeleteIcon className="trash" />
        </div>
      </div>
    </div>
  );
};

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
    // Add your edit lesson logic here
  };

  const handleCreateLesson = () => {
    // Add your create lesson logic here
  };

  const Label = () => {
    return (
      <div className="label">
        
        <div className="label text-wrapper">
        <AddCircleIcon fontSize='large' />
          Crear Clase
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="main">
        <div className= 'header'>
            <div className={classes.profilePicture} />
            <div className={classes.profileText}>Admin</div>
        </div>
        <Label />
        <div className={classes.lessonsContainer}>
          {lessons.map((lesson, index) => (
            <Box key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLessons;



