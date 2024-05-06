import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderProfiles from '../../components/HeaderProfiles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const VolunteerWait = () => {
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch status
        const token = localStorage.getItem('accessToken');
        const fetchStatus = async () => {
        const volunteerId = localStorage.getItem('volunteerId');
        const response = await axios.get(`${API_ENDPOINT}volunteer/${volunteerId}/`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }});
    
        setStatus(response.data.status);
    
        if (response.data.status === 'ACEPTADO') {
            navigate('/voluntario/formacion');
        } else if (response.data.status === 'RECHAZADO') {
            // Show a toast notification
            toast.error('Tu solicitud ha sido rechazada');
        }
        };
  
        // Fetch status immediately when the component mounts
        fetchStatus();
    
        // Then fetch status every 5 seconds
        const interval = setInterval(fetchStatus, 5000);
    
        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    return (
        <div className='App'>
            <HeaderProfiles profile={'voluntario'} showProfile={false} />
            <ToastContainer />
            <h1 style={{marginTop: '10rem'}}>Estamos revisando su solicitud</h1>
            <h4>Estado: {status}</h4>
        </div>
    );
};

export default VolunteerWait;