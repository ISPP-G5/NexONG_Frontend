import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AdminLayout from '../components/AdminLayout';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../styles/styles.css';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


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
  formContainer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  lessonsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '2rem',
    gap: '2rem', // Adjust as needed
  },
}));

const Box = ({ lesson, index, handleDelete }) => {
  const onDeleteClick = () => {
    handleDelete(index);
  };

  return (
    
    <div className="box">
      <div className="clase">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="nombre-educador">
            <div><strong>Nombre:</strong> {lesson.name}</div>
            <div><strong>Educador Asociado:</strong> {lesson.educator}</div>
            <div><strong>Nº Alumnos:</strong> {lesson.students.length}</div>
            <div><strong>Información:</strong> {lesson.description}</div>
          </div>
          <EditIcon className="edit-fill" />
          <DeleteIcon className="trash" onClick={onDeleteClick} />
        </div>
      </div>
    </div>
  );
};

const AdminClases = () => {
  const classes = useStyles();
  const [lessons, setLessons] = useState([
    { nombre: 'Clase 1', descripcion: 'Clase introducción', alumnos: 20, educador: 'Juan' },
    { nombre: 'Clase 2', descripcion: 'Clase desarrollo', alumnos: 15, educador: 'María' },
    { nombre: 'Clase 3', descripcion: 'Clase avanzada', alumnos: 18, educador: 'Pedro' },
    { nombre: 'Clase 5', descripcion: 'Clase práctica', alumnos: 25, educador: 'Ana' },
    { nombre: 'Clase 4', descripcion: 'Clase práctica', alumnos: 25, educador: 'Ana' },
  ]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (index) => {
    const updatedLessons = [...lessons];
    updatedLessons.splice(index, 1);
    setLessons(updatedLessons);
  };

  const AddClass = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className={classes.addClassButton} onClick={handleClickOpen}>
          <AddCircleIcon fontSize='large' />
          Crear Clase
        </button>

        <Dialog open={open} onClose={handleClose}>
          <div className={classes.formContainer}>
            <label>Nombre de la Clase:</label>
            <input type="text" placeholder="Ingrese el nombre" />
            <label>Nombre del Educador:</label>
            <input type="text" placeholder="Ingrese el nombre" />
            <label>Número de alumnos:</label>
            <input type="text" placeholder="Ingrese el número" />
            <label>Más Información:</label>
            <input type="text" placeholder="Ingrese la información" />
            <Button variant="contained" color="primary">
              Crear
            </Button>
          </div>
        </Dialog>
      </div>
    );
  };

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}lesson/`)
      .then((response) => {
        console.log('response:',response.data);

        setLessons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });
  }, []); 



  return (
    <AdminLayout selected='Clases'> {/* Use AdminLayout here */}
    <AddClass />
    <div className={classes.lessonsContainer} style={{ marginRight: '20rem' }}>
      {lessons.map((lesson, index) => (
        <Box key={index} index={index} lesson={lesson} handleDelete={handleDelete} />
      ))}
    </div>
  </AdminLayout>
  );
};

export default AdminClases;
