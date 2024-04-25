import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LayoutProfiles from '../../components/LayoutProfiles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../styles/styles.css';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import ButtonCreate from '../../components/ButtonCreate';
import useToken from '../../components/useToken';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const Box = ({ lesson, index, handleDelete, handleEditClick, users }) => {
  const educator = users.find(user => user.id === lesson.educator);
  const morningLessonText = lesson.is_morning_lesson ? 'Sí' : 'No';

  const onDeleteClick = () => {
    handleDelete(lesson.id);
  };

  return (
    <div className="box">
        <p><strong>Nombre:</strong> {lesson.name}</p>
        <p><strong>Descripción:</strong> {lesson.description}</p>
        <p><strong>Inicio:</strong> {lesson.start_date} {lesson.start_time}</p>
        <p><strong>Fin:</strong> {lesson.end_date} {lesson.end_time}</p>
        <p><strong>Capacidad:</strong> {lesson.capacity}</p>
        <p><strong>Nº Alumnos:</strong> {lesson.students ? lesson.students.length : 0}</p>
        <p><strong>Clase de Mañana:</strong> {morningLessonText}</p>
        <p><strong>Educador:</strong> {educator ? `${educator.first_name} ${educator.last_name}` : 'No asignado'}</p>
        <EditIcon className="edit-lessons" onClick={() => handleEditClick(lesson.id)} />
        <DeleteIcon className="trash-lessons" onClick={onDeleteClick} />
    </div>
  );
};

const AdminLessons = () => {
  const [token, updateToken] = useToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };
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
        .delete(`${API_ENDPOINT}lesson/${lessonToDelete}/`, config)
        .then((response) => {
          console.log('Lesson deleted successfully');
          toast.success('Clase eliminada con éxito');
          setLessons(lessons.filter(lesson => lesson.id !== lessonToDelete));
        })
        .catch((error) => {
          console.error('Error deleting lesson:', error);
        })
        .finally(() => {
          setLessonToDelete(null); 
        });
    }
  };

  const handleEditClick = (lessonId) => {
    navigate(`/admin/clases/editar/${lessonId}`);
  };

  const handleCreateClassClick = () => {
    navigate('/admin/clases/crear');
  };

  const handleCreateScheduleClick = () => {
    navigate('/admin/horarios/crear');
  };
  const handleScheduleClick = () => {
    navigate('/admin/horarios');
  }

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}lesson/`, config)
      .then((response) => {
        console.log('response:', response.data);
        setLessons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching lessons:', error);
      });
    axios
      .get(`${API_ENDPOINT}user/`, config)
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
    <div className='button-container'>
      <ButtonCreate className='button-contrast' text='Ver Horarios' handleCreate={handleScheduleClick} withIcon={false} />
      <ButtonCreate className='button-contrast' text='Crear Clase' handleCreate={handleCreateClassClick} withIcon={true} />
      <ButtonCreate className='button-contrast' text='Crear Horario' handleCreate={handleCreateScheduleClick} withIcon={true} />
    </div>
      <ToastContainer />
      <div className='lessons-container'>
      {lessons.length > 0 ? (
        lessons.map((lesson, index) => (
          <Box
            key={index}
            index={index}
            lesson={lesson}
            handleDelete={handleDelete}
            handleEditClick={handleEditClick}
            users={users}
          />
        ))
      ):(
        <div className="centered-message">
        <p>No hay ninguna clase creada</p>
      </div>
      )}
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
