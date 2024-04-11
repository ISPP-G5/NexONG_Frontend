import React, { useState, useEffect } from 'react';
import LayoutProfiles from '../../components/LayoutProfiles';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const AdminSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

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
    // Navigate to the edit page with the schedule ID as a parameter
    navigate(`/admin/horarios/editar/${scheduleId}`);
  };

  const handleDeleteSchedule = async (scheduleId) => {
    const confirmed = window.confirm('¿Seguro que quieres borrar?');
    if (confirmed) {
      try {
        await axios.delete(`${API_ENDPOINT}schedule/${scheduleId}`);
        // Filter out the deleted schedule from the state
        setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== scheduleId));
        console.log('Schedule deleted successfully');
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  return (
    <LayoutProfiles profile={'admin'} selected={'Horarios'}>
      <div className="card-info-suggestion table">
        <h2>Lista de Horarios</h2>
        <table>
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
                <td>{schedule.lessonData.name}</td>
                <td>{schedule.lessonData.start_date}</td>
                <td>{schedule.lessonData.end_date}</td>
                <td>{schedule.weekday}</td>
                <td>{schedule.start_time}</td>
                <td>{schedule.end_time}</td>
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
    </LayoutProfiles>
  );
};

export default AdminSchedules;
