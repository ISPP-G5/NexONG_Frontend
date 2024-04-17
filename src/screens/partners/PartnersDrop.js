import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderProfiles from '../../components/HeaderProfiles';
import useAdjustMargin from '../../components/useAdjustMargin';
import { toast, ToastContainer } from 'react-toastify';
import PushPinIcon from '@mui/icons-material/PushPin';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useToken from '../../components/useToken';
import LayoutProfiles from '../../components/LayoutProfiles';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


function PartnersDrop() {
  const [token, updateToken] = useToken();
  const config_volunteer = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    }
  };
  
  const config_user = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [motivation, setMotivation] = useState('');




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address) {
      toast.error('Dirección es obligatorio');
      return;
    }
  };
  
  const marginTop = useAdjustMargin('.header-profiles');

  return (
    <div className='App'>
      <ToastContainer />
      <LayoutProfiles profile={'socios'}>
       
      
      
      <form className='register-container' style={{marginTop }} onSubmit={handleSubmit}>
        <h2>Baja</h2>

        <label>Correo</label>
        <input
          value={address}
          type='text'
          placeholder='Escriba su dirección'
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Motivo</label>
        <input
          value={postalCode}
          type='text'
          placeholder='Escriba su código postal'
          onChange={(e) => setPostalCode(e.target.value)}
        />

   




        <button type='submit' className='register-button'>
          Enviar
        </button>
         <button type='button' className='register-button' >
              Atrás
            </button>

      </form>


      <PushPinIcon style={{ position: 'absolute', width: '51px', height: '50px', left: '32rem', top: '52rem' }} />
        <p style={{ position: 'absolute', width: '40rem', height: '60px', left: '27rem', top: '50rem', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '25px', lineHeight: '30px', display: 'flex', alignItems: 'center', color: '#000000' }}>
          No olvide pulsar el enlace mandado a su correo para finalizar el proceso de baja
        </p>
      </LayoutProfiles>
    </div>
  );
}

export default PartnersDrop;
