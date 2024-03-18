import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LayoutProfiles from '../../components/LayoutProfiles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../styles/styles.css';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const useStyles = makeStyles(() => ({
  lessonsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(28rem, 1fr))',
    marginTop: '2rem',
    gap: '2rem', // Adjust as needed
  },
}));

const Box = ({ lesson, index, handleDelete, handleEditClick, users }) => {
  const educator = users.find(user => user.id === lesson.educator);
  const morningLessonText = lesson.is_morning_lesson ? 'Sí' : 'No';

  const onDeleteClick = () => {
    handleDelete(lesson.id);
  };

  return (
    <div className="box">
      <div className="clase">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="nombre-educador">
            <div><strong>Nombre:</strong> {lesson.name}</div>
            <div><strong>Descripción:</strong> {lesson.description}</div>
            <div><strong>Inicio:</strong> {lesson.start_date} {lesson.start_time}</div>
            <div><strong>Fin:</strong> {lesson.end_date} {lesson.end_time}</div>
            <div><strong>Capacidad:</strong> {lesson.capacity}</div>
            <div><strong>Educador Asociado:</strong> {educator ? educator.name : "No se encontró educador"}</div>
            <div><strong>Nº Alumnos:</strong> {lesson.students ? lesson.students.length : 0}</div>
            <div><strong>Clase de Mañana:</strong> {morningLessonText}</div>
          </div>
          <EditIcon className="edit-fill" onClick={() => handleEditClick(lesson.id)} />
          <DeleteIcon className="trash" onClick={onDeleteClick} />
        </div>
      </div>
    </div>
  );
};

const AdminLessons = () => {
  const classes = useStyles();
  const [lessons, setLessons] = useState([]);
  const [users, setUsers] = useState([]);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  const navigate = useNavigate();

  const handleDelete = (lessonId) => {
    setLessonToDelete(lessonId);
  };

  const handleDeleteConfirmation = () => {
    if (lessonToDelete) {
      axios
        .delete(`${API_ENDPOINT}lesson/${lessonToDelete}/`)
        .then((response) => {
          console.log('Lesson deleted successfully');
          toast.success('Clase eliminada con éxito');
          setLessons(lessons.filter(lesson => lesson.id !== lessonToDelete));
        })
        .catch((error) => {
          console.error('Error deleting lesson:', error);
        })
        .finally(() => {
          setLessonToDelete(null); // Reset lessonToDelete state
        });
    }
  };

  const handleEditClick = (lessonId) => {
    navigate(`/admin/clases/editar/${lessonId}`);
  };

  const handleCreateClassClick = () => {
    navigate('/admin/clases/crear');
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
    <LayoutProfiles profile={'admin'} selected={'Clases'}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="addClassButton" onClick={handleCreateClassClick}>
          <AddCircleIcon fontSize='large' />
          Crear Clase
        </button>
      </div>
      <ToastContainer />
      <div className={classes.lessonsContainer} style={{ marginRight: '20rem' }}>
        {lessons.map((lesson, index) => (
          <Box
            key={index}
            index={index}
            lesson={lesson}
            handleDelete={handleDelete}
            handleEditClick={handleEditClick}
            users={users}
          />
        ))}
      </div>
      <Dialog open={lessonToDelete !== null} onClose={() => setLessonToDelete(null)}>
        <DialogTitle>¿Estás seguro que quieres borrar esta clase?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setLessonToDelete(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirmation} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </LayoutProfiles>
  );
};

export default AdminLessons;
