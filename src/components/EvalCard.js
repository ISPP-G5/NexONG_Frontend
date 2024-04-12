import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EvalCard({ evaluat, gradeTypes, student}) {
  

  return (
    <div className='card-info'>
      <ToastContainer autoClose={5000} />
  
        <div className='lessonEvent-info'>
          <p><strong>Nota:</strong></p>
          <p>{evaluat.grade}</p>
          <p><strong>Nombre completo:</strong></p>
          <p>{student.name + " " + student.surname}</p>
          <p><strong>Fecha:</strong></p>
          <p>{evaluat.date}</p>
          <p><strong>Tipo:</strong></p>
          <p>{gradeTypes}</p>
        </div> 
      </div>
  );
}
export default EvalCard;