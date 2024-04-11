import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import '../styles/styles.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import useToken from './useToken'; 
import avatarImage from '../logo/avatar.png';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const Profile = ({ usuario }) => {
  const [token, updateToken] = useToken(); 

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  };

  const [valores, setValores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_ENDPOINT}auth/users/me/`, config)
      .then(response => {
        setValores(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [token]); 

  
  const handleEliminar = async(profile) =>{
    if(!profile.id || profile.id <= 0){
      toast.error('Error al eliminar', {
        autoClose: 5000
      })
    }else{
      if(profile.role === 'VOLUNTARIO'){
        await axios.delete(`${API_ENDPOINT}volunteer/${profile.volunteer}/`, config);
      } else if(profile.role === 'SOCIO'){
        await axios.delete(`${API_ENDPOINT}partner/${profile.partner}/`, config);
      } else if(profile.role === 'EDUCADOR'){
        await axios.delete(`${API_ENDPOINT}educator/${profile.educator}/`, config);
      } else if(profile.role === 'FAMILIA'){
        await axios.delete(`${API_ENDPOINT}family/${profile.family}/`, config);
      } else {
        toast.error('El usuario no puede ser borrado', {
          autoClose: 5000
        })
        window.location.reload(); // Recarga la ventana después de eliminar
      }
      toast.success("Persona eliminada correctamente", {
        autoClose: 5000
      })
      navigate('/');
    }
  }

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleConfirmDelete = (profile) => {
    handleEliminar(profile);
    setConfirmDeleteOpen(false);
  };


  return (
    <div className='register-container admin' style={{width: '300px', marginTop:'6%'}}>
          <ToastContainer />
          <img src={valores.avatar && valores.avatar !== '' ? valores.avatar : avatarImage} alt="imagen" />

          <div style={{ alignSelf: 'center', fontWeight: 'bold', marginTop: '1%', marginBottom:'1%' }}>{valores.username}</div>

          <p>Email</p>
          <input type='text' value={valores.email || ''} readOnly />

          <p>Teléfono</p>
          <input type='text' value={valores.phone || ''} readOnly />

          <p>Contraseña</p>
          <input type='password' value="********" readOnly />

          {valores.role !== "ADMIN" &&
          <button className='button-decline' style={{marginTop: '5%'}} onClick={() => setConfirmDeleteOpen(true)}>
              Borrar cuenta y datos
          </button>
          }
          <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
            <DialogTitle>¿Estás seguro que quieres borrar tu cuenta y datos de nuestra ONG?</DialogTitle>
            <DialogActions>
              <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                Cancelar
              </Button>
              <Button onClick={() => handleConfirmDelete(valores)} color="secondary">
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>

          <button className='register-button admin' >
            <Link to={`/${usuario}/perfil/actualizar`}>
              Actualizar perfil
            </Link>
          </button>
    </div>
  );
}

export default Profile;
