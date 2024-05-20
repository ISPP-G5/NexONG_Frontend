import React, { useState, useEffect } from 'react';
import '../../styles/styles.css';
import { useFetchSuggestions } from '../../components/useFetchData';
import LayoutProfiles from '../../components/LayoutProfiles';
import useToken from '../../components/useToken';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const AdminSuggestions = () => {
    const [token, updateToken] = useToken();
    const [suggestions, setSuggestions] = useFetchSuggestions(API_ENDPOINT, token);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    async function handleDelete(id) {
      setConfirmDeleteOpen(false)
      try {
        const token = localStorage.getItem('accessToken');  // Replace with your actual token
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
    
        await axios.delete(`${API_ENDPOINT}suggestion/${id}`, config);
        setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));

      } catch (error) {
        // Handle error...
      }
    }

    return (
        <LayoutProfiles profile={'admin'} selected={'Sugerencias'}>
                <ToastContainer />

            {suggestions.map((suggestion, index) => (
              <div className='card-info' key={index}>
                <div>
                    <p><strong>Asunto:  </strong>{suggestion.subject}</p>
                    <p><strong>Sugerencia:  </strong>{suggestion.description}</p>
                    <p><strong>Correo:  </strong>{suggestion.email || 'Anónimo'}</p>
                </div>
                          
                <DeleteIcon className='trash-lessons' onClick={() => setConfirmDeleteOpen(true)} />
                
                <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                  <DialogTitle>¿Estás seguro que quieres borrar la sugerencia?</DialogTitle>
                  <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                      Cancelar
                    </Button>
                    <Button onClick={() => handleDelete(suggestion.id)} color="secondary">
                      Confirmar
                    </Button>
                  </DialogActions>
                </Dialog>
                <ToastContainer />
              </div>
            ))}
        </LayoutProfiles>
    );
}

export default AdminSuggestions;