import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import useToken from './useToken'; 
import avatarImage from '../logo/avatar.png';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const Profile = ({ usuario }) => {
  const [token] = useToken(); 
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}auth/users/me/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setUserData(response.data);
        console.log('User',userData);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar datos del usuario', { autoClose: 5000 });
      }
    };

    fetchData();
  }, []);
  
  const handleEliminar = async() =>{
    try{
      const roleEndpointMap = {
        'VOLUNTARIO': `volunteer/${userData.volunteer}`,
        'SOCIO': `partner/${userData.partner}`,
        'EDUCADOR': `educator/${userData.educator}`,
        'FAMILIA': `family/${userData.family}`,
      };
  
      const endpoint = roleEndpointMap[userData.role];
  
      if (endpoint) {
        await axios.delete(`${API_ENDPOINT}${endpoint}/`, config);
        toast.success("Persona eliminada correctamente", { autoClose: 5000 });
        navigate('/');
      } else {
        throw new Error('Invalid user role');
      }
    } catch (error) {
      console.error(error);
      toast.error('El usuario no puede ser borrado', { autoClose: 5000 });
      window.location.reload(); 
    }
  }

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  return (
    <div className='register-container admin' style={{width: '300px', marginTop:'6%'}}>
      <ToastContainer />
      <img src={userData.avatar || avatarImage} alt="Profile Avatar" />

      <div style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: '1%', marginBottom:'1%' }}>
        {userData.username}
      </div>

      <p>Email</p>
      <input type='text' value={userData.email || ''} readOnly />

      <p>Teléfono</p>
      <input type='text' value={userData.phone || ''} readOnly />

      <p>Contraseña</p>
      <input type='password' value="********" readOnly />

      {usuario !== "admin" && (
        <button className='button-decline' style={{marginTop: '5%'}} onClick={() => setConfirmDeleteOpen(true)}>
          Borrar cuenta y datos
        </button>
      )}

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>¿Estás seguro que quieres borrar tu cuenta y datos de nuestra ONG?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEliminar} color="secondary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {usuario === "socio" && (
        <button className='register-button admin' style={{marginTop: '5%'}} onClick={() => setConfirmDeleteOpen(true)}>
          <Link to={`/${usuario}/renovar`}>
            Cambiar cuota
          </Link>
        </button>
      )}

      <button className='register-button admin'>
        <Link to={`/${usuario}/perfil/actualizar`}>
          Actualizar perfil
        </Link>
      </button>
    </div>
  );
};

export default Profile;
