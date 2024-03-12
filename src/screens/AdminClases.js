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
            <div><strong>Descripción:</strong> {lesson.description}</div>
            <div><strong>Capacidad:</strong> {lesson.capacity}</div>
            <div><strong>Educador Asociado:</strong> {lesson.educator}</div>
            <div><strong>Nº Alumnos:</strong> {lesson.students ? lesson.students.length : 0}</div>
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
  const [lessons, setLessons] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    is_morning_lesson: true,
    educator: '',
    students: [],
    start_date: '',
    end_date: '',
  });

  const handleCreateLesson = (formData) => {
    axios
      .post(`${API_ENDPOINT}lesson/`, formData)
      .then((response) => {
        console.log('response of post:', response.data);

        setLessons([...lessons, response.data]);
        handleClose(); // Close the form after creating the lesson
      })
      .catch((error) => {
        console.error('Error creating lesson:', error);
      });
  };

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
  const [localFormData, setLocalFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    is_morning_lesson: true,
    educator: '',
    students: [],
    start_date: '',
    end_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle special case for the "students" field
    if (name === 'students') {
      // Split the input string by commas and convert each ID to an integer
      const studentIds = value.split(',').map((id) => parseInt(id.trim(), 10));
      setLocalFormData({ ...localFormData, [name]: studentIds });
    } else {
      setLocalFormData({ ...localFormData, [name]: value });
    }
  };
  

  const handleSubmit = () => {
    
    handleCreateLesson(localFormData);
    handleClose();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button className={classes.addClassButton} onClick={handleClickOpen}>
        <AddCircleIcon fontSize='large' />
        Crear Clase
      </button>

      <Dialog open={open} onClose={handleClose}>
        <div className={classes.formContainer}>
          <label>Nombre de la Clase:</label>
          <input
            type="text"
            placeholder="Ingrese el nombre"
            name="name"
            value={localFormData.name}
            onChange={handleChange}
          />
           <input
            type="text"
            placeholder="Ingrese descripcion"
            name="description"
            value={localFormData.description}
            onChange={handleChange}
          />
          <label>Capacidad:</label>
          <input
            type="number"
            placeholder="Ingrese la capacidad"
            name="capacity"
            value={localFormData.capacity}
            onChange={handleChange}
          />

          <label>¿Es una clase de la mañana?</label>
          <input
            type="checkbox"
            name="is_morning_lesson"
            checked={localFormData.is_morning_lesson}
            onChange={handleChange}
          />

          <label>ID del Educador:</label>
          <input
            type="text"
            placeholder="Ingrese el ID del educador"
            name="educator"
            value={localFormData.educator}
            onChange={handleChange}
          />

          <label>Estudiantes (IDs separados por comas):</label>
          <input
            type="text"
            placeholder="Ingrese los IDs de los estudiantes"
            name="students"
            value={localFormData.students}
            onChange={handleChange}
          />

          <label>Fecha de Inicio:</label>
          <input
            type="datetime-local"
            name="start_date"
            value={localFormData.start_date}
            onChange={handleChange}
          />

          <label>Fecha de Fin:</label>
          <input
            type="datetime-local"
            name="end_date"
            value={localFormData.end_date}
            onChange={handleChange}
          />


          {/* Add other input fields similarly */}

          <Button type="button" variant="contained" color="primary" onClick={handleSubmit}>
            Crear
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

// ... (rest of the code remains the same)


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
  }, []);

  return (
    <AdminLayout selected='Clases'>
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
