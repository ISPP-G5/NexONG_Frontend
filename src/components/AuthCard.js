import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthCard({ auth, nomStudent, nomEvent, dateEvent}) {

  const dateObj = new Date(dateEvent);
  dateObj.setTime(dateObj.getTime() - 3600000);
  const options = { timeZone: 'Europe/Madrid', hour12: false }; 

  const formattedDate = dateObj.toLocaleDateString('es-ES', options) + ' ' + dateObj.toLocaleTimeString('es-ES', options);

  const handleDescargar = (auth) => {
    const urlDocumento = auth.authorization;
    const nombreArchivo = 'autorizacion.pdf'; 
  
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = urlDocumento;
    enlaceDescarga.download = nombreArchivo;
  
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    document.body.removeChild(enlaceDescarga);
  
  };
  

  return (
    <div className='card-info'>
      <ToastContainer autoClose={5000} />
      
        <div className='lessonEvent-info'>
        <p><strong>Nombre del estudiante:</strong></p>
          <p>{nomStudent}</p>
          <p><strong>Nombre del evento:</strong></p>
          <p>{nomEvent}</p>
          <p><strong>Fecha del evento:</strong></p>
          <p>{formattedDate}</p>
          <p><strong>Descarga la autorización:</strong></p>
          <button className='button-contrast' onClick={() => handleDescargar(auth)}>Autorización (PDF)</button>
          <p><strong>¿Ha confirmado su asistencia? {auth.is_authorized ? '✓' : '✗'}</strong></p>
        </div> 
      </div>
  );
}
export default AuthCard;