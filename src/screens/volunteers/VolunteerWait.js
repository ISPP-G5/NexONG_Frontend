import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderProfiles from '../../components/HeaderProfiles';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const VolunteerWait = () => {
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await axios.get(`${API_ENDPOINT}volunteer/`);

      setStatus(response.data.status);

      if (response.data.status === 'ACEPTADO') {
        clearInterval(interval);
        navigate('/voluntario/perfil');
      } else if (response.data.status === 'RECHAZADO') {
        clearInterval(interval);
        // Redirect to a different page if you want
        // history.push('/rechazado');
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className='App'>
      <HeaderProfiles profile={'voluntario'} showProfile={false} />
      <h1>Reviewing your request...</h1>
      <p>Status: {status}</p>
    </div>
  );
};

export default VolunteerWait;