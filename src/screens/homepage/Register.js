import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import google from '../../logo/google.svg';
import LayoutHomepage from '../../components/LayoutHomepage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import  useAdjustMargin from '../../components/useAdjustMargin';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function Register() {
  const navigate = useNavigate();
  const[first_name,setFirst_name] = useState('');
  const[surname,setSurname] = useState('');
  const[email,setEmail] = useState('');
  const[idNumber,setIdNumber] = useState('');
  const[password,setPassword] = useState('');
  const[confirmPassword,setConfirmPassword] = useState('');
  const[address,setAddress] = useState('');
  const[birthdate,setBirthdate] = useState('');
  const[phone,setPhone] = useState('');

 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function constantTimeComparison(str1, str2){
    if (str1.length !== str2.length){
        return false;
    }
    let result = 0;
    for (let i = 0 ; i < str1.length; i++){
        result |= str1.charCodeAt(i) ^ str2.charCodeAt(i);
    }
    return result === 0;
}

  const [isFamilyChecked, setIsFamilyChecked] = useState(false);
  const [isVolunteerChecked, setIsVolunteerChecked] = useState(false);
  const [isAgreedChecked, setIsAgreedChecked] = useState(false);

  const handleFamilyChange = () => {
    setIsFamilyChecked(!isFamilyChecked);
    setIsVolunteerChecked(false);
  };

  const handleVolunteerChange = () => {
    setIsVolunteerChecked(!isVolunteerChecked);
    setIsFamilyChecked(false);
    };

  const handleAgreedChange = () => {
    setIsAgreedChecked(!isAgreedChecked);
    };
    const marginTop = useAdjustMargin();

    const sendRecurringForm = async(e) => {
      e.preventDefault();
      if(!first_name || first_name === ''){
          toast.error("Introduzca un nombre")
      }else if(!surname || surname === ''){
          toast.error("Introduzca apellidos")
      }else if(!email || email === ''){
          toast.error("Introduzca un correo electrónico")
      }else if(!idNumber || idNumber === ''){
          toast.error("Introduzca un DNI")
      }else if(!address || address === ''){
          toast.error("Introduzca una dirección")
      }else if(!birthdate || birthdate === ''){
          toast.error("Introduzca una fecha de nacimiento")
      } else if(!phone || phone === ''){
        toast.error("Introduzca número de telefono correcto")
      }
      else if(!password || password === ''){
          toast.error("Introduzca una contraseña")
      }else if (!constantTimeComparison(password, confirmPassword)){
          toast.error("Las contraseñas no coinciden")
      }else{
          const partnerData = new FormData();
          partnerData.append('address',address);
          partnerData.append('birthdate',birthdate);
          const recurringFormData = new FormData();
          recurringFormData.append('name',first_name);
          recurringFormData.append('surname',surname);
          recurringFormData.append('email',email);
          recurringFormData.append('id_number',idNumber);
          recurringFormData.append('password',password);
          recurringFormData.append('is_agreed',isAgreedChecked);
                   
          try{
            
            const update = await axios.post(`${API_ENDPOINT}auth/users/`,
            recurringFormData,
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(update);
            const { data } = update;
            if (data.message){
                toast.error(data.message);
            } else {
              toast.success('Cuenta creada con éxito. Entre en su correo para verificarla', {onClose: () => navigate('/')})

            }
          } catch(error){
            Object.entries(error.response.data).forEach(([key, value]) => {
              toast.error(`${value}`);
            });
            console.error('Error',error);
          }
        };
    }  

  return (
    <LayoutHomepage 
            title={'Asociación Manos Abiertas con Norte'} 
            description={'Manos Abiertas surge como iniciativa en 1992. Un grupo de jóvenes voluntarios/as, detecta necesidades socioeducativas en la zona de Polígono Norte, Sevilla, y comienza a impartir clases de apoyo de matemáticas y lengua a los niños y niñas de los centros educativos de la zona: Blas Infante y Josefa Amor y Rico (Actualmente IES Inmaculada Vieira), en locales situados en bloques de la barriada.'}
            image={'ong'}
            toastcontainer={true}
            intro={false}
        > 
        <form className='register-container' style={{marginTop }} onSubmit={sendRecurringForm}>
          <h2>Regístrese</h2>
          <label>Nombre</label>
          <input
          value={first_name}
          type='text'
          placeholder='Escriba su nombre'
          onChange={(e) => setFirst_name(e.target.value)}
          />
          <label>Apellidos</label>
          <input
          value={surname}
          type='text'
          placeholder='Escriba sus apellidos'
          onChange={(e) => setSurname(e.target.value)}
          />
          <label>Correo electrónico</label>
          <input
          value={email}
          type='text'
          placeholder='Escriba su correo electrónico'
          onChange={(e) => setEmail(e.target.value)}
          />
          <label>DNI</label>
          <input
          value={idNumber}
          type='text'
          placeholder='Escriba su DNI'
          onChange={(e) => setIdNumber(e.target.value)}
          />
           <label>Télefono</label>
          <input
          value={phone}
          type='text'
          placeholder='Escriba su télefono'
          onChange={(e) => setPhone(e.target.value)}
          />
          <label>Dirección</label>
          <input
          value={address}
          type='text'
          placeholder='Escriba su dirección'
          onChange={(e) => setAddress(e.target.value)}
          />
          <label>Fecha de nacimiento</label>
          <input
          value={birthdate}
          type='date'
          onChange={(e) => setBirthdate(e.target.value)}
          />
          <label>Contraseña</label>
          <input
          value={password}
          type='password'
          placeholder='Escriba su contraseña'
          onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirmar contraseña</label>
          <input
          value={confirmPassword}
          type='password'
          placeholder='Confirme su contraseña'
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
           <div className="checkbox-group">
            <input
              type="checkbox"
              id="selectCheckboxFamily"
              className="hidden-checkbox"
              checked={isFamilyChecked}
              onChange={handleFamilyChange}
            />
            <label htmlFor="selectCheckboxFamily" className="checkbox-label">
              <span className="custom-checkbox"></span>      Registrarse como familiar
            </label>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="selectCheckboxVolunteer"
              className="hidden-checkbox"
              checked={isVolunteerChecked}
              onChange={handleVolunteerChange}
            />
            <label htmlFor="selectCheckboxVolunteer" className="checkbox-label">
              <span className="custom-checkbox"></span>      Registrarse como voluntario
            </label>
          </div>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="selectCheckboxAgreed"
              className="hidden-checkbox"
              checked={isAgreedChecked}
              onChange={handleAgreedChange}
            />
            <label htmlFor="selectCheckboxAgreed" className="checkbox-label">
              <span className="custom-checkbox"></span>      Acepto los términos y condiciones
            </label>
          </div>
          <button className='register-button'>
            Crear cuenta
            </button>
            <p style={{ textAlign: 'center', marginTop: '0px', marginBottom: '0px'}}>o</p>
            <Link to={"https://myaccount.google.com/"} className='google-button'>
              <span>Registrarse con Google</span>
              <img src={google} alt="Logo"/>
              </Link>
              <p style={{ textAlign: 'center', marginBottom: '5%'}}>
                ¿Ya tiene una cuenta?
                <Link to="/iniciar-sesion" style={{ color: '#6FC0DB' }}>
                  Inicie sesión aquí
                </Link>
              </p>
          </form>
    </LayoutHomepage>
  );

};

export default Register;