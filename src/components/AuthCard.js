import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AuthCard({ auth, nomStudent, nomEvent}) {

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
      
        <div className='auth-info'>
          <p>{nomStudent}</p>
          <p><strong>{nomEvent}</strong></p>
          <button className='button-contrast' onClick={() => handleDescargar(auth)}>Autorizacion</button>
          {auth.is_authorized ? <p>true</p> : <p>false</p>}
        </div> 
      </div>
  );
}
export default AuthCard;