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
  const [valores, setValores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}auth/users/me/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setValores(response.data);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar datos del usuario', { autoClose: 5000 });
      }
    };

    fetchData();
  }, [token, API_ENDPOINT]);

  const handleEliminar = async () => {
    if (!valores.id || valores.id <= 0) {
      toast.error('Error al eliminar', { autoClose: 5000 });
      return;
    }

    try {
      const path = `${API_ENDPOINT}${valores.role.toLowerCase()}/${valores[valores.role.toLowerCase()]}/`;
      await axios.delete(path, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      toast.success("Persona eliminada correctamente", { autoClose: 5000 });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('El usuario no puede ser borrado', { autoClose: 5000 });
    }
  };

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  return (
    <div className='register-container admin' style={{width: '300px', marginTop:'6%'}}>
      <ToastContainer />
      <img src={valores.avatar || avatarImage} alt="Profile Avatar" />

      <div style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: '1%', marginBottom:'1%' }}>
        {valores.username}
      </div>

      <p>Email</p>
      <input type='text' value={valores.email || ''} readOnly />

      <p>Teléfono</p>
      <input type='text' value={valores.phone || ''} readOnly />

      <p>Contraseña</p>
      <input type='password' value="********" readOnly />

      {valores.role !== "ADMIN" && (
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

      <button className='register-button admin'>
        <Link to={`/${usuario}/perfil/actualizar`}>
          Actualizar perfil
        </Link>
      </button>
    </div>
  );
};

export default Profile;
