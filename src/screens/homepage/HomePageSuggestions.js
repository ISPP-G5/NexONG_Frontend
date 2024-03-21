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

  const[email,setEmail] = useState('');
  const[subject,setSubject] = useState('');
  const[description,setDescription] = useState('');
  const[date,setDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.getFullYear() + '-' + (
      '0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + (
      '0' + currentDate.getDate()).slice(-2);
    setDate(formattedDate);
  }, []);

  const sendForm = async(e) => {
    e.preventDefault();
    if(!subject || subject === ''){
      toast.error("Intdoduzca un asunto");
    }else if(!description || description === ''){
      toast.error("Intdoduzca su sugerencia")
    }else{
      const formData = new FormData();
      formData.append('email',email);
      formData.append('subject',subject);
      formData.append('description',description);
      formData.append('date',date);
      try{
        const update = await axios.post(`${API_ENDPOINT}suggestion/`,
        formData,
        {
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(update);
        const { data } = update;
        if(data.message){
          toast.error(data.message);
        }else{
          toast.success('Sugerencia enviada con éxito')
        }
      }catch(error){
        console.error('Error', error);
      }
    }
  }

  return (
    <LayoutHomepage 
      title="Sugerencias"
      image={'ong'}
      toastcontainer={true}
    >
      <form className='register-container'
      style={{width: '80%'}}
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
        <input
        value={description}
        type='text'
        placeholder='¿Qué es lo que quiere decirnos?'
        onChange={(e) => setDescription(e.target.value)}
        />

        <button type='submit' className='register-button'>
            Enviar
        </button>

      </form>
    </LayoutHomepage>
    
  );
}
export default HomePageSuggestions;