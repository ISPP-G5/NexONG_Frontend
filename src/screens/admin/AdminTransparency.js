import React, { useEffect, useState } from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const token = localStorage.getItem('accessToken');

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`,
  }
};
  
const Document = () => {
    const [title, setTitle] = useState('');
    const [document, setDocument] = useState('');
    const [docType, setDocType] = useState('');
    const [date, setDate] = useState('');

  
  
    const sendForm = async (e) => {
      e.preventDefault(); // Prevenir la recarga de la página
      if (!title || title === '') {
        toast.error("Se debe de insertar un titulo", {
          autoClose: 5000
        })
      } else if (!document || document === '') {
        toast.error("Se debe adjuntar un documento")
      } else if (!date || date === '') {
        toast.error("Se debe poner una fecha")
      } else{
        const documentFormData = new FormData();
        documentFormData.append('title',title);
        documentFormData.append('document',document);
        documentFormData.append('docType',docType);
        documentFormData.append('date',date);
        console.log(documentFormData)        
        try{
          const update = await axios.post(`${API_ENDPOINT}home-document/`,
          documentFormData, config
          );
          console.log(update);
          const { data } = update;
          if (data.message){
              toast.error(data.message);
          } else {
              toast.success('Operación realizada correctamente')
          }
        } catch(error){
          console.error('Error',error);
        }
      };
        
      }
  
    
  
    return (
      <form onSubmit={sendForm} className='register-container admin'>
        <ToastContainer autoClose={5000} />
  
        <label>Título</label>
        <input
          type='text'
          value={title}
          placeholder='Escriba aquí'
          onChange={(e) => setTitle(e.target.value)}
        ></input>
  
        <label>Tipo de Documento</label>
        <select value={docType} onChange={(e) => setDocType(e.target.value)}>
          <option value="DOCS_INSTITUCIONALES">Documentos Institucionales</option>
          <option value="MEMORIAS_ANUALES">Memorias Anuales</option>
          <option value="MEMORIAS_ECONOMICAS">Memorias Económicas</option>
          <option value="BALANCE_CUENTAS">Balance de Cuentas</option>
          <option value="OTROS_DOCS">Otros documentos</option>
        </select>

        <label>Adjuntar Documento</label>
        <input
            type='file'
            onChange={(e) => setDocument(e.target.files[0])}
        ></input>
  
        <label>Fecha</label>
        <input
          value={date}
          id="date"
          type="date"
          placeholder='dd/mm/yyyy'
          onChange={(e) => setDate(e.target.value)}
        ></input>
  
        <button type='submit' className='register-button admin'>Subir Documento</button>
      </form>
  
    )
};

const AdminTransparency = () => {
    return (
    <LayoutProfiles profile='admin' selected='Socios'>
        <Document/>
    </LayoutProfiles>
    );
}

export default AdminTransparency;
