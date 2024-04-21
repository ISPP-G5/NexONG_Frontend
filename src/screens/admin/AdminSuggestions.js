import React, { useState, useEffect } from 'react';
import '../../styles/styles.css';
import { useFetchSuggestions } from '../../components/useFetchData';
import LayoutProfiles from '../../components/LayoutProfiles';
import useToken from '../../components/useToken';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const AdminSuggestions = () => {
    const [token, updateToken] = useToken();
    const [suggestions, setSuggestions] = useFetchSuggestions(API_ENDPOINT, token);
    
    async function handleDelete(id) {
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
         
    const ConfirmToast = ({ closeToast, handleDelete, id }) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          ¿Esta seguro que quiere eliminar la sugerencia?
          <div>
            <button style={{marginRight:'10px'}} onClick={() => { handleDelete(id); closeToast(); }}>Yes</button>
            <button onClick={closeToast}>No</button>
          </div>
        </div>
      );
    
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
                    
                    <DeleteIcon 
                    style={{ position: 'relative', top: '80%', left: '90%' }} 
                    onClick={() => {
                        toast(<ConfirmToast handleDelete={handleDelete} id={suggestion.id} />, {
                            autoClose: false,
                            closeOnClick: false,
                            draggable: false,
                            toastId: 'confirmDelete',
                        });
                    }}
                    />
                <ToastContainer />

                </div>
            ))}
        </LayoutProfiles>
    );
}

export default AdminSuggestions;