import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountCircle from '@material-ui/icons/AccountCircle';

function AuthCard({ child}) {

  const handleDownload = (url) => {  
    window.open(url);  
  };
  

  return (
    <div className='card-info' style={{justifyContent: 'space-evenly', alignItems: 'start'}}>
        <div className='lessonEvent-info'>
          {
            child.avatar ? 
            <img src={child.avatar} alt='avatar' style={{ maxHeight: '160px'}} />
            :<AccountCircle style={{ color: '#3b5998', fontSize: '160px' }} />
          }
        </div> 

        <div className='lessonEvent-info'>
          <p><strong>Nombre del estudiante:</strong></p>
          <p>{child.name} {child.surname}</p>
          <p><strong>Fecha de nacimiento:</strong></p>
          <p>{child.birthdate}</p>
          <p><strong>Nacionalidad:</strong></p>
          <p>{child.nationality}</p>
        </div> 
        <div className='lessonEvent-info'>
          <p><strong>Estado:</strong></p>
          <p>{child.status}</p>
          <p><strong>Tutor:</strong></p>
          <p>{child.education_center_tutor}</p>
          <p><strong>Año de educación actual:</strong></p>
          <p>{child.current_education_year}</p>
          <p><strong>Horario:</strong></p>
          <p>{child.is_morning_student ? 'Mañana' : 'Tarde'}</p>

        </div> 
        <div className='lessonEvent-info'>
          <p><strong>Descarga el documento de inscripción:</strong></p> 
          <button className='button-contrast' onClick={() => handleDownload(child.enrollment_document)}>Documento Inscripción</button>
          <p><strong>Descarga tarjeta sanitaria:</strong></p> 
          <button className='button-contrast' onClick={() => handleDownload(child.scanned_sanitary_card)}>Tarjeta sanitaria</button>
        </div> 

        <ToastContainer autoClose={5000} />
      </div>
  );
}
export default AuthCard;