import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderProfiles from '../../components/HeaderProfiles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YouTube from 'react-youtube';

function VolunteerFormation() {
/*
  const [video1Ended, setVideo1Ended] = useState(false);
  const [video2Ended, setVideo2Ended] = useState(false);
  const [video3Ended, setVideo3Ended] = useState(false);

  const allVideosEnded = video1Ended && video2Ended && video3Ended;

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (allVideosEnded) {
        navigate('/voluntario/agenda');
    } else {
        toast.error('Por favor, termine de ver los videos antes de continuar');
    }
  };

  const videoOptions = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className='App'>
        <HeaderProfiles profile={'voluntario'} showProfile={false} />
        <ToastContainer />

        <h1 style={{marginTop: '9rem'}}>Formación obligatoria de voluntarios</h1>
        <p style={{alignSelf: 'center'}}>Por favor, mira los siguientes videos para completar tu formación</p>

        <h2>Vídeo 1:</h2>
        <YouTube
            videoId="qOps0GI-TTw"
            opts={videoOptions}
            onEnd={() => setVideo1Ended(true)}
            className='formation-videos'
        />

        <h2>Vídeo 2:</h2>
        <YouTube
            videoId="GRjsJDBIqxg"
            opts={videoOptions}
            onEnd={() => setVideo2Ended(true)}
            className='formation-videos'
        />

        <h2>Vídeo 3:</h2>
        <YouTube
            videoId="hyCBopeI_kY"
            opts={videoOptions}
            onEnd={() => setVideo3Ended(true)}
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