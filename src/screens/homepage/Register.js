import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import google from '../../logo/google.svg';
import LayoutHomepage from '../../components/LayoutHomepage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import  useAdjustMargin from '../../components/useAdjustMargin';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

function Register() {

  const[first_name,setFirst_name] = useState('');
  const[surname,setSurname] = useState('');
  const[email,setEmail] = useState('');
  const[idNumber,setIdNumber] = useState('');
  const[password,setPassword] = useState('');
  const[confirmPassword,setConfirmPassword] = useState('');
  const[phone,setPhone] = useState('');
  const [termsText, setTermsText] = useState(null);

  const phoneFormat = /^[6-9]\d{8}$/; 
   const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const commonPasswords = ['password', '123456', '12345678', 'admin','hola','123','123456789','admin123','adios','asshole']; 
  const letters = /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/;
  const spanishIdFormat = /^[XYZ]?\d{5,8}[A-Z]$/;

 

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
  const [isPartnerChecked, setIsPartnerChecked] = useState(false);
  const [isAgreedChecked, setIsAgreedChecked] = useState(false);
 const [isDialogOpen, setDialogOpen] = useState(false);

  const handleFamilyChange = () => {
    setIsFamilyChecked(!isFamilyChecked);
    setIsVolunteerChecked(false);
    setIsPartnerChecked(false);
  };

  const handleVolunteerChange = () => {
    setIsVolunteerChecked(!isVolunteerChecked);
    setIsFamilyChecked(false);
    setIsPartnerChecked(false);
    };
    const handleDialogOpen = () => {
      setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
    

  const handlePartnerChange = () => {
    setIsPartnerChecked(!isPartnerChecked);
    setIsFamilyChecked(false);
    setIsVolunteerChecked(false);
  }

  const handleAgreedChange = () => {
    setIsAgreedChecked(!isAgreedChecked);
      };

  const marginTop = useAdjustMargin();
  const fetchTerms = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}terms/`);
      const terms = response.data;
      console.log('terms',terms)
      setTermsText(terms[0].text);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  useEffect(() => {
    fetchTerms();
  }, []);
  console.log('terms',termsText)

  const sendRecurringForm = async(e) => {
    e.preventDefault();
    if(!first_name || first_name === ''){
        toast.error("Introduzca un nombre")
    } else if(!surname || surname === ''){
        toast.error("Introduzca apellidos")
    } else if(!email || email === ''){
        toast.error("Introduzca un correo electrónico")
    } else if(!idNumber || idNumber === ''){
        toast.error("Introduzca un DNI")
    } else if(!phone || phone === ''){
        toast.error("Introduzca un número de teléfono correcto")
    } else if(!password || password === ''){
        toast.error("Introduzca una contraseña")
    } else if (!constantTimeComparison(password, confirmPassword)){
        toast.error("Las contraseñas no coinciden")
      }
      else if(!first_name.match(letters) || !first_name.match(letters)) {
          toast.error('Nombre y apellido no puede contener números');
          return;
      } 
      else if (!isFamilyChecked && !isVolunteerChecked && !isPartnerChecked) {
        toast.error("Debe elegir una de las opciones: familia, voluntario o socio");
      }
      else if (!phoneFormat.test(phone)) {
        toast.error('Formato de teléfono incorrecto');
        return;
       }
     else if (!emailFormat.test(email)) {
      toast.error('Formato de correo inválido');
      return;
     }
      else if(first_name.length>75){
        toast.error("Indica un nombre, no debe superar 75 caráteres")
    }
    else if (!idNumber.match(spanishIdFormat)) {
      toast.error('Formato de identificación inválido');
      return;
    }
    else if (password.length < 8) {
      toast.error('La contraseña debe tener 8 caracteres mínimo');
      return;
  }else if (!/\D/.test(password)) {
    toast.error('La contraseña no puede ser solo números');
    return;
  }else if  (commonPasswords.includes(password)) {
    toast.error('Contraseña demasiado común');
    return;
  }  
  
    else if(surname.length>75){
        toast.error("Indica un nombre, no debe superar 75 caráteres")
    }
   else if (!isAgreedChecked){
    toast.error("Acepte los términos y condiciones")
    }

    
    else {
      const username = `${first_name} ${surname}`;

        const userData = new FormData();
        userData.append('first_name', first_name);
        userData.append('last_name', surname);
        userData.append('email', email);
        userData.append('username',username)
        userData.append('id_number', idNumber);
        userData.append('phone', phone);
        userData.append('password', password);
        userData.append('role', isVolunteerChecked ? 'VOLUNTARIO' : isPartnerChecked ? 'SOCIO' : 'FAMILIA');
        userData.append('is_agreed', isAgreedChecked);
        userData.append('is_enabled', false);
        console.log('username',username)
        
        try {
          const userUpdate = await axios.post(`${API_ENDPOINT}auth/users/`, 
          userData, config);
          console.log(userUpdate);

          const { data } = userUpdate;
          if (data.message){
              toast.error(data.message);
          }else{
            setFirst_name('');
            setSurname('');
            setEmail('');
            setIdNumber('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
            setIsFamilyChecked(false);
            setIsVolunteerChecked(false);
            setIsPartnerChecked(false);
            toast.success('Registro correcto. Revise su correo para activar cuenta')
          }
        } catch(error){
          Object.entries(error.response.data).forEach(([key, value]) => {
            toast.error(`${value}`);
          });
        }
    }
  }  
  const TermsAndConditions = ({ termsText }) => {
    console.log('termsText:', termsText); // Log the original termsText

    const termsArray = termsText.split(/\.(?=\w)/);
    console.log('termsArray:', termsArray); // Log the array of terms

    const formattedTerms = termsArray.map((term, index) => {
      const colonIndex = term.indexOf(':');
      const title = term.substring(0, colonIndex + 1);
      const content = term.substring(colonIndex + 1);
      console.log('term:', term); // Log each term
      console.log('title:', title); // Log the title of each term
      console.log('content:', content); // Log the content of each term
  
  
      return (
        <div key={index} style={{textAlign:'justify'}}>
          <strong>{index === 0 ? <span>Términos y Condiciones de Uso.</span> : title}</strong>
          {content}
        </div>
      );
    });
    return <> {formattedTerms}</>
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
          type='email'
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
          type='tel'
          placeholder='Escriba su télefono'
          onChange={(e) => setPhone(e.target.value)}
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
              id="selectCheckboxPartner"
              className="hidden-checkbox"
              checked={isPartnerChecked}
              onChange={handlePartnerChange}
            />
            <label htmlFor="selectCheckboxPartner" className="checkbox-label">
              <span className="custom-checkbox"></span>      Registrarse como socio
            </label>
          </div>

          <div className="checkbox-group">
            <div >
              <input
                type="checkbox"
                id="selectCheckboxAgreed"
                className="hidden-checkbox"
                checked={isAgreedChecked}
                onChange={handleAgreedChange}
              />
              <label htmlFor="selectCheckboxAgreed" className="checkbox-label">
                <span className="custom-checkbox"></span>
                Acepto los&nbsp;<span onClick={handleDialogOpen} style={{color: 'blue', cursor: 'pointer'}}>términos y condiciones</span>              </label>
            </div>
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Términos y Condiciones</DialogTitle>
              <DialogContent>
                <TermsAndConditions termsText={termsText} />
              </DialogContent>
            </Dialog>
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