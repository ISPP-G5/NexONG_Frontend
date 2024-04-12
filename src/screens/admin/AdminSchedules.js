import React, { useState, useEffect } from 'react';
import LayoutProfiles from '../../components/LayoutProfiles';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/styles.css';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import useToken from '../../components/useToken';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const token = localStorage.getItem('accessToken');

const AdminSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [scheduleToDelete, setScheduleToDelete] = useState(null); // State to track the schedule ID to delete
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const schedulesResponse = await axios.get(`${API_ENDPOINT}schedule/`);
        const schedulesData = schedulesResponse.data;

        const schedulesWithLessons = await Promise.all(
          schedulesData.map(async (schedule) => {
            const lessonResponse = await axios.get(`${API_ENDPOINT}lesson/${schedule.lesson}`);
            const lessonData = lessonResponse.data;
            return { ...schedule, lessonData };
          })
        );

        setSchedules(schedulesWithLessons);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  const handleEditSchedule = (scheduleId) => {
    navigate(`/admin/horarios/editar/${scheduleId}`);
  };

  const handleDeleteSchedule = (scheduleId) => {
    setScheduleToDelete(scheduleId); // Set the schedule ID to delete
  };

  const handleDeleteConfirmation = async () => {
    if (scheduleToDelete) {
      try {
        await axios.delete(`${API_ENDPOINT}schedule/${scheduleToDelete}`);
        setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== scheduleToDelete));
        toast.success('Horario eliminado con éxito');
      } catch (error) {
        console.error('Error deleting schedule:', error);
        toast.error('Error al eliminar el horario');
      } finally {
        setScheduleToDelete(null); // Reset the schedule ID to delete
      }
    }
  };

  return (
    <LayoutProfiles profile={'admin'} selected={'Horarios'}>
      <ToastContainer />
      <button className='button' onClick={() => navigate('/admin/clases')} style={{ alignSelf: 'start', marginLeft: '15%' }}>
        Volver
      </button>
      <div className="card-info-suggestion table">
        <div class= "table-wrapper">
        <h2>Lista de Horarios</h2>
        <table style={{ borderSpacing: '10px' }}>
          <thead>
            <tr>
              <th style={{ wordWrap: 'break-word', width: '15%' }}>Clase</th>
              <th style={{ overflowWrap: 'break-word', width: '15%' }}>Fecha de inicio de la Clase</th>
              <th style={{ overflowWrap: 'break-word', width: '15%' }}>Fecha de fin de la Clase</th>
              <th style={{ overflowWrap: 'break-word', width: '15%' }}>Día de la semana</th>
              <th style={{ overflowWrap: 'break-word', width: '15%' }}>Hora de inicio</th>
              <th style={{ overflowWrap: 'break-word', width: '15%' }}>Hora de fin</th>
              <th style={{ overflowWrap: 'break-word', width: '15%' }}>Editar</th>
              <th style={{ overflowWrap: 'break-word', width: '15%' }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td style={{ backgroundColor: '#cdf0fe', textAlign: 'left', verticalAlign: 'top', wordWrap: 'break-word' }}>{schedule.lessonData.name}</td>
                <td style={{ backgroundColor: '#cdf0fe', textAlign: 'left', verticalAlign: 'top', wordWrap: 'break-word' }}>{schedule.lessonData.start_date}</td>
                <td style={{ backgroundColor: '#cdf0fe', textAlign: 'left', verticalAlign: 'top', wordWrap: 'break-word' }}>{schedule.lessonData.end_date}</td>
                <td style={{ backgroundColor: '#cdf0fe', textAlign: 'left', verticalAlign: 'top', wordWrap: 'break-word' }}>{schedule.weekday}</td>
                <td style={{ backgroundColor: '#cdf0fe', textAlign: 'left', verticalAlign: 'top', wordWrap: 'break-word' }}>{schedule.start_time}</td>
                <td style={{ backgroundColor: '#cdf0fe', textAlign: 'left', verticalAlign: 'top', wordWrap: 'break-word' }}>{schedule.end_time}</td>
                <td>
                  <EditIcon onClick={() => handleEditSchedule(schedule.id)} />
                </td>
                <td>
                  <DeleteIcon onClick={() => handleDeleteSchedule(schedule.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>


          
        </div>

      </div>
      {/* Delete confirmation dialog */}
      <Dialog open={scheduleToDelete !== null} onClose={() => setScheduleToDelete(null)}>
        <DialogTitle>¿Estás seguro que quieres borrar este horario?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setScheduleToDelete(null)} color="primary">
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

export default AdminSchedules;
