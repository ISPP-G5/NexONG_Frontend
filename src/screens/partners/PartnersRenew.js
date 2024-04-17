import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderProfiles from '../../components/HeaderProfiles';
import useAdjustMargin from '../../components/useAdjustMargin';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useToken from '../../components/useToken';
import LayoutProfiles from '../../components/LayoutProfiles';


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


function PartnersRenew() {
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
        <h2>Renovar o cambiar cuota</h2>
        <p>Para domiciliar sus recibos necesitamos los siguientes datos:</p>

        <label>Titular de la cuenta</label>
        <input
          value={address}
          type='text'
          placeholder='Escriba su dirección'
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>Nº de cuenta con IBAN</label>
        <input
          value={postalCode}
          type='text'
          placeholder='Escriba su código postal'
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <label>¿Con qué cantidad deseas colaborar?</label>
        <textarea
          value={motivation}
          placeholder='Escriba aquí'
          onChange={(e) => setMotivation(e.target.value)}
        />


        <label>¿Con qué periodicidad?</label>

         {/* Checkbox 1 */}
         <div className="checkbox-partner">
          <input 
            type="checkbox" 
            id="partner1" 
          />
          <label htmlFor="partner1">MENSUAL (la cantidad introducida cada mes)</label>
        </div>

        {/* Checkbox 2 */}
        <div className="checkbox-partner">
          <input 
            type="checkbox" 
            id="partner2" 
          />
          <label htmlFor="partner2">TRIMESTRAL (la cantidad introducida cada tres meses)</label>
        </div>

        {/* Checkbox 3 */}
        <div className="checkbox-partner">
          <input 
            type="checkbox" 
            id="partner3" 
          />
          <label htmlFor="partner3">SEMESTRAL (la cantidad introducida cada seis meses)</label>
        </div>

        <div className="checkbox-partner">
          <input 
            type="checkbox" 
            id="partner3" 
          />
          <label htmlFor="partner3">ANUAL (la cantidad introducida una vez al año)</label>
        </div>



        <button type='submit' className='register-button'>
          Finalizar
        </button>
         <button type='button' className='register-button' >
              Atrás
            </button>

      </form>
      </LayoutProfiles>
    </div>
  );
}

export default PartnersRenew;
