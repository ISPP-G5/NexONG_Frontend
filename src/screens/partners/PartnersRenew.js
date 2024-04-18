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
  const config_partner = {
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

  const [holder, setHolder] = useState('');
  const [iban, setIban] = useState('');
  const [quantity, setQuantity] = useState('');
  const [frequency, setFrequency] = useState('');

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}donation/`, config_partner)
      .then((response) => {
        console.log('response:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching donation:', error);
      });

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!holder || !iban || !quantity || !frequency) {
      toast.error('Todos los campos son obligatorios');
      return;
    }
  
    try {
      const response = await axios.post(`${API_ENDPOINT}donation/`, {
        iban: iban,
        quantity: quantity,
        frequency: frequency,
        holder: holder
      }, config_partner);
  
      console.log('Donation created:', response.data);
      toast.success('Donación creada exitosamente');
    } catch (error) {
      console.error('Error creating donation:', error);
      toast.error('Error al crear la donación');
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
            value={holder}
            type='text'
            placeholder='Escriba el nombre del titular de la cuenta'
            onChange={(e) => setHolder(e.target.value)}
          />

          <label>Nº de cuenta con IBAN</label>
          <input
            value={iban}
            type='text'
            placeholder='Escriba su código IBAN'
            onChange={(e) => setIban(e.target.value)}
          />

          <label>¿Con qué cantidad deseas colaborar?</label>
          <textarea
            value={quantity}
            placeholder='Escriba aquí la cantidad deseada'
            onChange={(e) => setQuantity(e.target.value)}
          />

          <label>¿Con qué frecuencia?</label>
  
          {/* Checkbox Container */}
          <div className="checkbox-container-partner">
            {/* Checkbox 1 */}
            <div className="checkbox-partner">
              <input 
                type="checkbox" 
                id="mensual" 
              />
              <label htmlFor="mensual">MENSUAL (la cantidad introducida cada mes)</label>
            </div>

            {/* Checkbox 2 */}
            <div className="checkbox-partner">
              <input 
                type="checkbox" 
                id="trimestral" 
              />
              <label htmlFor="trimestral">TRIMESTRAL (la cantidad introducida cada tres meses)</label>
            </div>

            {/* Checkbox 3 */}
            <div className="checkbox-partner">
              <input 
                type="checkbox" 
                id="semestral" 
              />
              <label htmlFor="semestral">SEMESTRAL (la cantidad introducida cada seis meses)</label>
            </div>

            <div className="checkbox-partner">
              <input 
                type="checkbox" 
                id="anual" 
              />
              <label htmlFor="anual">ANUAL (la cantidad introducida una vez al año)</label>
            </div>
          </div>

          <button type='submit' className='register-button'>
            Finalizar
          </button>
          <button type='button' className='register-button' onClick={() => navigate('/previous-page')}>
            Atrás
          </button>
        </form>
      </LayoutProfiles>
    </div>
  );
}

export default PartnersRenew;



