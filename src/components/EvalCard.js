import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EvalCard({ evaluat, evalType, student, lessons }) {
  const dateObj = new Date(evaluat.date);
  const formattedDate = dateObj.toLocaleDateString('es-ES');

  // Estilos en línea específicos para este componente
  const cardStyle = {
    backgroundColor: '#cdf0fe',
    borderRadius: '25px',
    boxShadow: '0px 4px 4px #9ee5ff',
    padding: '3%',
    width: '80%',
    margin: '2%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const leftStyle = {
    flex: '1',
    textAlign: 'left',
    fontSize: '1.5rem', // Tamaño más grande para la nota y el tipo
    fontWeight: 'bold',
    color: '#000'
  };

  const rightStyle = {
    flex: '2',
    textAlign: 'left',
    paddingLeft: '20px', // Espacio entre las columnas
    fontSize: '1rem',
    color: '#000'
  };

  // Función para obtener la nota relativa
  const getRelativeGrade = (grade, gradeType) => {
    let maxGrade = 10; // Asumimos un valor por defecto de 10
    if (gradeType === 'UNO A CINCO') {
      maxGrade = 5;
    } else if (gradeType === 'CERO A UNO') {
      maxGrade = 1;
    }
    else {
      maxGrade = 10;
    }
    return `${grade}/${maxGrade}`;
  };

  return (
    <div style={cardStyle}>
      <ToastContainer autoClose={5000} />
      <div style={leftStyle}>
        <p><strong>Nota:</strong> {getRelativeGrade(evaluat.grade, evalType.grade_system)}</p>
        <p><strong>EVALUACIÓN DE </strong> {evalType.grade_system}</p>
      </div>
      <div style={rightStyle}>
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
