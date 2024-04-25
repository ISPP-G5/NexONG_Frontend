import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderProfiles from '../../components/HeaderProfiles';
import useAdjustMargin from '../../components/useAdjustMargin';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import useToken from '../../components/useToken';
import IBAN from 'iban';
import LayoutProfiles from '../../components/LayoutProfiles';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function PartnersRenew() {
  const [token, updateToken] = useToken();
  const [isDonationMade, setIsDonationMade] = useState(false);
  const [existingDonations, setExistingDonations] = useState([]);

  const config_partner = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    }
  };

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}donation/`, config_partner)
      .then((response) => {
        console.log('response:', response.data);
        setExistingDonations(response.data); // Store existing donations
      })
      .catch((error) => {
        console.error('Error fetching donation:', error);
      });
  }, []);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/socio/perfil');
  };

  const [holder, setHolder] = useState('');
  const [iban, setIban] = useState('');
  const [quantity, setQuantity] = useState('');
  const [frequency, setFrequency] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there's an existing donation with the same IBAN
    const existingDonation = existingDonations.find(donation => donation.iban === iban);

    if (existingDonation) {
      if (!holder || !iban || !quantity || !frequency) {
        toast.error('Todos los campos son obligatorios');
        return;
      }
      if (!IBAN.isValid(iban)) {
        toast.error('El formato del IBAN no es correcto');
        return;
      }

      const parsedQuantity = parseFloat(quantity);
      if (parsedQuantity <= 0 || isNaN(parsedQuantity)) {
        toast.error('La cantidad debe ser mayor que 0');
        return;
      }
      // Update existing donation
      try {
        const response = await axios.patch(`${API_ENDPOINT}donation/${existingDonation.id}/`,  {
          iban: iban,
          quantity: quantity,
          frequency: frequency,
          holder: holder,
          date: selectedDate
        }, config_partner);
        setIsDonationMade(true);
        console.log('Donation updated:', response.data);
        toast.success('Cuota actualizada correctamente');
        setTimeout(() => {
          navigate('/socio/perfil');
        }, 2000); // 2000 milliseconds = 2 seconds
      } catch (error) {
        console.error('Error updating donation:', error);
      }
    } else {
      // Create new donation
      if (!holder || !iban || !quantity || !frequency) {
        toast.error('Todos los campos son obligatorios');
        return;
      }
      if (!IBAN.isValid(iban)) {
        toast.error('El formato del IBAN no es correcto');
        return;
      }

      const parsedQuantity = parseFloat(quantity);
      if (parsedQuantity <= 0 || isNaN(parsedQuantity)) {
        toast.error('La cantidad debe ser mayor que 0');
        return;
      }

      try {
        const response = await axios.post(`${API_ENDPOINT}donation/`, {
          iban: iban,
          quantity: quantity,
          frequency: frequency,
          holder: holder,
          date: selectedDate
        }, config_partner);
        setIsDonationMade(true);
        console.log('Donation created:', response.data);
        toast.success('Cuota creada correctamente');

         // Add a delay before navigating
  setTimeout(() => {
    navigate('/socio/perfil');
  }, 2000); // 2000 milliseconds = 2 seconds


      } catch (error) {
        console.error('Error creating donation:', error);
      }
    }
  };

  const marginTop = useAdjustMargin('.header-profiles');

  const handleCheckboxChange = (value) => {
    setFrequency(value);
  };

  return (
    <div className='App'>
      <ToastContainer />
      <LayoutProfiles profile={'socio'}>
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
  
          <div className="checkbox-container-partner">
            <div className="checkbox-partner">
              <input 
                type="checkbox" 
                id="mensual" 
                checked={frequency === 'MENSUAL'}
                onChange={() => handleCheckboxChange('MENSUAL')}
              />
              <label htmlFor="mensual">MENSUAL (la cantidad introducida cada mes)</label>
            </div>

            <div className="checkbox-partner">
              <input 
                type="checkbox" 
                id="trimestral" 
                checked={frequency === 'TRIMESTRAL'}
                onChange={() => handleCheckboxChange('TRIMESTRAL')}
              />
              <label htmlFor="trimestral">TRIMESTRAL (la cantidad introducida cada tres meses)</label>
            </div>

            <div className="checkbox-partner">
              <input 
                type="checkbox" 
                id="semestral" 
                checked={frequency === 'SEMESTRAL'}
                onChange={() => handleCheckboxChange('SEMESTRAL')}
              />
              <label htmlFor="semestral">SEMESTRAL (la cantidad introducida cada seis meses)</label>
            </div>

            <div className="checkbox-partner">
              <input 
                type="checkbox" 
                id="anual" 
                checked={frequency === 'ANUAL'}
                onChange={() => handleCheckboxChange('ANUAL')}
              />
              <label htmlFor="anual">ANUAL (la cantidad introducida una vez al año)</label>
            </div>
          </div>

          <label>Fecha</label>
          <input
            type='date'
            value={new Date().toISOString().substr(0, 10)}
            readOnly
          />

          <button type='submit' className='register-button'>
            Finalizar
          </button>
          <button type='button' className='register-button' onClick={handleProfileClick}>
            Atrás
          </button>
        </form>
      </LayoutProfiles>
    </div>
  );
}

export default PartnersRenew;
