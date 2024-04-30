import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderProfiles from '../../components/HeaderProfiles';
import useAdjustMargin from '../../components/useAdjustMargin';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useNavigate } from 'react-router-dom';
import useToken from '../../components/useToken';
import LayoutProfiles from '../../components/LayoutProfiles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function PartnersDrop() {
  const [token, updateToken] = useToken();
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

  const handleProfileClick = () => {
    navigate('/socio/perfil');
  };

  const [email, setEmail] = useState('');
  const [motive, setMotive] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      toast.error('Por favor, introduzca un correo electrónico válido');
      return;
    }

    if (!motive) {
      toast.error('Por favor, rellene todos los campos');
      return;
    }

    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`${API_ENDPOINT}auth/users/`, config_user, {
        data: { email, motive }
      });

      if (response.status === 200) {
        toast.success('Dado de baja correctamente');
        navigate('/logout');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error dando de baja al usuario');
    }
  };

  const marginTop = useAdjustMargin('.header-profiles');

  return (
    <div className='App'>
      <LayoutProfiles profile={'socio'}>
        <ToastContainer />
        <form className='register-container' style={{ marginTop }} onSubmit={handleSubmit}>
          <h2>Baja</h2>

          <label>Correo</label>
          <input
            value={email}
            type='text'
            placeholder='Escriba su correo electrónico'
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Motivo</label>
          <input
            value={motive}
            type='text'
            placeholder='Escriba el motivo de su baja en la asociación'
            onChange={(e) => setMotive(e.target.value)}
          />

          <button type='submit' className='register-button'>Enviar</button>
          <button type='button' className='register-button' onClick={handleProfileClick}>Atrás</button>
        </form>

        <PushPinIcon style={{ position: 'absolute', width: '51px', height: '50px', left: '32rem', top: '52rem' }} />
        <p style={{ position: 'absolute', width: '40rem', height: '60px', left: '27rem', top: '50rem', fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '25px', lineHeight: '30px', display: 'flex', alignItems: 'center', color: '#000000' }}>
          No olvide pulsar el enlace mandado a su correo para finalizar el proceso de baja
        </p>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro que quiere darse de baja?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmDelete} color="error">
              Sí
            </Button>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </LayoutProfiles>
    </div>
  );
}

export default PartnersDrop;
