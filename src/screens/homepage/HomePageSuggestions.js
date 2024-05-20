import '../../styles/styles.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import LayoutHomepage from '../../components/LayoutHomepage';


function HomePageSuggestions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const[email,setEmail] = useState('');
  const[subject,setSubject] = useState('');
  const[description,setDescription] = useState('');
  const[date,setDate] = useState('');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '-' + (
      '0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + (
      '0' + currentDate.getDate()).slice(-2);
    setDate(formattedDate);
  }, []);

  const sendForm = async(e) => {
    e.preventDefault();
    if (email && !emailFormat.test(email)) {
      toast.error('Formato de correo inválido');
      return;
     }
    if(!subject || subject === ''){
      toast.error("Introduzca un asunto");
    }else if(!description || description === ''){
      toast.error("Introduzca su sugerencia")
    }else if(description.length > 255){
      toast.error("La descripción puede contener hasta 255 carácteres")
    }
    else{
      const formData = new FormData();
      formData.append('email',email);
      formData.append('subject',subject);
      formData.append('description',description);
      formData.append('date',date);
      try{
        const update = await axios.post(`${API_ENDPOINT}suggestion/`,
        formData
        );
        const { data } = update;
        if(data.message){
          toast.error(data.message);
        }else{
          console.log('Operation was successful');
          toast.success('Sugerencia enviada con éxito')
        }
      }catch(error){
        console.error('Error', error);
      }
    }
  }

  return (
    <LayoutHomepage 
      title="SUGERENCIAS"
      image={'suggestions'}
      toastcontainer={true}
    >
      <form className='register-container'
      onSubmit={sendForm}>

        <h2>¿En qué podemos mejorar?</h2>

        <label>Email (opcional)</label>
        <input
        value={email}
        type='text'
        placeholder='Puede proporcionarnos su email si lo desea'
        onChange={(e) => setEmail(e.target.value)}
        />

        <label>Asunto</label>
        <input
        value={subject}
        type='text'
        placeholder='¿De qué quiere hablarnos?'
        onChange={(e) => setSubject(e.target.value)}
        />

        <label>Sugerencia</label>
        <textarea
        value={description}
        placeholder='¿Qué es lo que quiere decirnos?'
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '80%',height:'300px' }}
        />

        <button type='submit' className='register-button'>
            Enviar
        </button>

      </form>
    </LayoutHomepage>
    
  );
}
export default HomePageSuggestions;