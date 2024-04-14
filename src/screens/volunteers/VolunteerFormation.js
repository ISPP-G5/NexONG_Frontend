import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderProfiles from '../../components/HeaderProfiles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
// Import the videos
import video1 from '../../logo/formationVideos/Formacion-Manos-Abiertas-Online-1.mp4';
import video2 from '../../logo/formationVideos/Formacion-Manos-Abiertas-Online-2.mp4';
import video3 from '../../logo/formationVideos/Formacion-Manos-Abiertas-Online-3.mp4';
*/
function VolunteerFormation() {
/*
  const [video1Ended, setVideo1Ended] = useState(false);
  const [video2Ended, setVideo2Ended] = useState(false);
  const [video3Ended, setVideo3Ended] = useState(false);

  const allVideosEnded = video1Ended && video2Ended && video3Ended;

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (allVideosEnded) {
        navigate('/voluntario/perfil');
    } else {
        toast.error('Por favor, termine de ver los videos antes de continuar');
    }
  };

  return (
    <div className='App'>
        <HeaderProfiles profile={'voluntario'} showProfile={false} />
        <ToastContainer />

        <h1 style={{marginTop: '9rem'}}>Formación obligatoria de voluntarios</h1>
        <p style={{alignSelf: 'center'}}>Por favor, mira los siguientes videos para completar tu formación</p>

        <h2>Vídeo 1:</h2>
        <video
            src={video1}
            controls
            onEnded={() => setVideo1Ended(true)}
            className='formation-videos'
        />

        <h2>Vídeo 2:</h2>
        <video
            src={video2}
            controls
            onEnded={() => setVideo2Ended(true)}
            className='formation-videos'
        />

        <h2>Vídeo 3:</h2>
        <video
            src={video3}
            controls
            onEnded={() => setVideo3Ended(true)}
            className='formation-videos'
        />

        <button 
            className='register-button' 
            style={{alignSelf: 'center', width: '40%', marginBottom: '5%'}}
            onClick={handleButtonClick}
        >
            Finalizar
        </button>
    </div>
  );*/
}

export default VolunteerFormation;