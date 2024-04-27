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
    const [doHandleAceptarRechazar, setDohandleAceptarRechazar] = useState(false);

    async function handleDelete(id) {
      setDohandleAceptarRechazar(false)
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
        <LayoutProfiles profile={'admin'} selected={'Sugerencas'}>
                <ToastContainer />

            {suggestions.map((suggestion, index) => (
                <div className='card-info-suggestion' key={index}>
                    {/* <div>
                        <p>{suggestion.subject}</p>
                        <p>{suggestion.description}</p>
                        <p>{suggestion.email || 'Anónimo'}</p>
                    </div> */}
                    <table>
                        <tbody>
                        <tr>
                            <td><strong>Asunto:</strong></td>
                            <td>{suggestion.subject}</td>
                        </tr>
                        <tr>
                            <td><strong>Sugerencia:</strong></td>
                            <td>{suggestion.description}</td>
                        </tr>
                        <tr>
                            <td><strong>Correo:</strong></td>
                            <td>{suggestion.email || 'Anónimo'}</td>
                        </tr>
                      
                        </tbody>
                    </table>

                    <Dialog open={doHandleAceptarRechazar} onClose={() => setDohandleAceptarRechazar(false)}>
                      <DialogTitle>¿Estás seguro que quieres rechazar?</DialogTitle>
                      <DialogActions>
                        <Button onClick={() => setDohandleAceptarRechazar(false)} color="primary">
                          Cancelar
                        </Button>
                        <Button onClick={() => handleDelete(suggestion.id)} color="secondary">
                          Confirmar
                        </Button>
                      </DialogActions>
                    </Dialog>
                    
                    <DeleteIcon 
                    style={{ position: 'relative', top: '80%', left: '90%' }} 
                    onClick={() => setDohandleAceptarRechazar(true)}
                    />
                <ToastContainer />

                </div>
            ))}
        </LayoutProfiles>
    );
}

export default AdminSuggestions;