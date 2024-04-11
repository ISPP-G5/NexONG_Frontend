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
 const [isDialogOpen, setDialogOpen] = useState(false);

  const handleFamilyChange = () => {
    setIsFamilyChecked(!isFamilyChecked);
    setIsVolunteerChecked(false);
  };

  const handleVolunteerChange = () => {
    setIsVolunteerChecked(!isVolunteerChecked);
    setIsFamilyChecked(false);
    };
    const handleDialogOpen = () => {
      setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
    

  const handleAgreedChange = () => {
    setIsAgreedChecked(!isAgreedChecked);
      };

  const marginTop = useAdjustMargin();

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
        toast.error("Introduzca número de telefono correcto")
    } else if(!password || password === ''){
        toast.error("Introduzca una contraseña")
    } else if (!constantTimeComparison(password, confirmPassword)){
        toast.error("Las contraseñas no coinciden")
    } else {
        const userData = new FormData();
        userData.append('first_name', first_name);
        userData.append('last_name', surname);
        userData.append('email', email);
        userData.append('id_number', idNumber);
        userData.append('phone', phone);
        userData.append('password', password);
        userData.append('role', isVolunteerChecked ? 'VOLUNTARIO' : 'FAMILIA');
        userData.append('is_agreed', isAgreedChecked);
        userData.append('is_enabled', false);

        
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
            toast.success('Registro correcto. Revise su correo para activar cuenta')
          }
        } catch(error){
          Object.entries(error.response.data).forEach(([key, value]) => {
            toast.error(`${value}`);
          });
        }
    }
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
              <p><strong>Términos y Condiciones de Uso.</strong> Por favor, lea estos términos y condiciones de uso (T&C) detenidamente antes de utilizar nuestro servicio.</p>
              <p><strong>Aceptación de Términos:</strong> Al acceder y utilizar nuestro servicio, usted acepta estar sujeto a estos T&C y a todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, no utilice el servicio.</p>
              <p><strong>Uso del Servicio:</strong> Usted acepta utilizar el servicio únicamente con fines legales y de acuerdo con estos T&C. Se prohíbe el uso del servicio para actividades ilegales o no autorizadas.</p>
              <p><strong>Propiedad Intelectual:</strong> Todo el contenido y los derechos de propiedad intelectual asociados con el servicio son propiedad de NexOng o de sus licenciantes. Usted acepta no copiar, modificar, distribuir, transmitir, mostrar, vender o explotar de otra manera dicho contenido sin el consentimiento previo por escrito de NexOng.</p>
              <p><strong>Privacidad:</strong> El uso del servicio está sujeto a nuestra política de privacidad, que describe cómo recopilamos, usamos y compartimos sus datos personales. Al utilizar el servicio, usted acepta estar sujeto a nuestra política de privacidad.</p>
              <p><strong>Limitación de Responsabilidad:</strong> En la máxima medida permitida por la ley, NexOng no será responsable ante usted por daños directos, indirectos, incidentales, especiales, consecuentes o punitivos que surjan de su uso del servicio.</p>
              <p><strong>Modificaciones de los Términos:</strong> Nos reservamos el derecho de modificar estos T&C en cualquier momento. Cualquier cambio entrará en vigencia inmediatamente después de su publicación en el sitio web. Se le recomiendaS revisar periódicamente estos T&C para estar al tanto de cualquier cambio.</p>
              <p><strong>Jurisdicción y Ley Aplicable:</strong> Estos T&C se regirán e interpretarán de acuerdo con las leyes del [país/estado/provincia], sin tener en cuenta sus conflictos de principios legales.Al utilizar nuestro servicio, usted acepta cumplir con estos T&C. Si tiene alguna pregunta sobre estos términos, por favor contáctenos.</p>
              <p><strong>NexOng Fecha de última actualización: </strong> 2024-04-07</p>
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