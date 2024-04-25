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

const AdminSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [scheduleToDelete, setScheduleToDelete] = useState(null); // State to track the schedule ID to delete
  const navigate = useNavigate();
  const [token, updateToken] = useToken();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const schedulesResponse = await axios.get(`${API_ENDPOINT}schedule/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const schedulesData = schedulesResponse.data;
  
        const schedulesWithLessons = await Promise.all(
          schedulesData.map(async (schedule) => {
            const lessonResponse = await axios.get(`${API_ENDPOINT}lesson/${schedule.lesson}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            });
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
  }, [token]); // Include token in the dependency array to trigger the effect when it changes
  

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
      <div className="card-info-schedules">
        <div class= "table-responsive">
        <h2>Lista de Horarios</h2>
        <table style={{ borderSpacing: '10px' }}>
          <thead>
            <tr>
              <th>Clase</th>
              <th>Fecha de inicio de la Clase</th>
              <th>Fecha de fin de la Clase</th>
              <th>Día de la semana</th>
              <th>Hora de inicio</th>
              <th>Hora de fin</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td style={{textAlign: 'left'}}>{schedule.lessonData.name}</td>
                <td>{schedule.lessonData.start_date}</td>
                <td>{schedule.lessonData.end_date}</td>
                <td>{schedule.weekday}</td>
                <td>{schedule.start_time}</td>
                <td>{schedule.end_time}</td>
                <td style={{textAlign: 'center'}}>
                  <EditIcon onClick={() => handleEditSchedule(schedule.id)} />
                </td>
                <td style={{textAlign: 'center'}}>
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
