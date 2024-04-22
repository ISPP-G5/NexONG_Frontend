import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EvalCard({ evaluat, evalType, student, lessons }) {
  const dateObj = new Date(evaluat.date);
  const formattedDate = dateObj.toLocaleDateString('es-ES');

  // Función para obtener la nota relativa
  const getRelativeGrade = (grade, gradeType) => {
    let maxGrade = 10; // Asumimos un valor por defecto de 10
    if (gradeType === 'UNO A CINCO') {
      maxGrade = 5;
    } else if (gradeType === 'CERO A UNO') {
      maxGrade = 1;
    } else {
      maxGrade = 10;
    }
    return `${grade}/${maxGrade}`;
  };

  return (
    <div className="card-info" >
      <ToastContainer autoClose={5000} />
      <div className="grade-circle" style={{
        alignSelf: 'center',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem',
        fontWeight: 'bold',
        boxShadow: '0px 2px 2px #6bd4fe',
        margin: '10px',
        flexShrink: 0 // Prevent circle from shrinking
      }}>
        {getRelativeGrade(evaluat.grade, evalType.grade_system)}
      </div>
      <div style={{
        textAlign: 'left',
        flexGrow: 1,
        minWidth: '50%', // Minimum width of the text container
        padding: '10px'
      }}>
        <p><strong>Nombre de la evaluación:</strong> {evalType.name}</p>
        <p><strong>Nombre completo del alumno:</strong> {student.name + " " + student.surname}</p>
        <p><strong>Fecha de la evaluación:</strong> {formattedDate}</p>
        <p><strong>Curso:</strong> {lessons.name}</p>
        {evaluat.comment && <p><strong>Comentario:</strong> {evaluat.comment}</p>}
      </div>
    </div>
  );
}

export default EvalCard;
