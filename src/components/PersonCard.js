import DeleteIcon from '@material-ui/icons/Delete';


function PersonCard({ person, personType, kids, lessons, evaluations, añadir, descargar, aceptar, rechazar, voluntariosData, trash = true }) {
  
  const handleDescargarOAceptar = (d) => {
    d ===true?descargar(voluntariosData.filter(v => v.id = person.volunteer)):aceptar(voluntariosData.filter(v => v.id = person.volunteer));
  };
  

  return (
    <div className='card-info'>
      {personType === 'family' ?
      <div className='family-info'>
        <p>{person.first_name}</p>
        <p><strong>{person.name}</strong></p>
        <p>Número de niños: {kids.filter(kid => kid.family === person.id).length}</p>
      </div> 
      :
      <div className='family-request'>
        <img src={person.avatar} alt='placeholder' />
        <div className='family-info' style={{ borderRight: 'none', borderBottom: 'none'}}>
          <p>{person.first_name}</p>
          <p>{person.last_name}</p>
          {personType === 'family' ? <p><strong>{person.name}</strong></p> : <p>{person.name}</p>}
          <p>{person.edad || person.surname}</p>
        </div>
      </div>
      }
      {kids &&
      <div className='kids-info'>
        {kids.filter(kid => kid.family === person.id).map((kid, kidIndex) => {
          const kidLesson = lessons.find(lesson => lesson.students.includes(kid.id));
          const kidEvaluation = evaluations.find(evaluation => evaluation.student === kid.id);
          return (
            <div className='kid' key={kidIndex}>
              <p>Nombre de niño: {kid.name} {kid.surname}</p>
              <p>Fecha de nacimiento: {kid.birthdate}</p>
              <p>Curso: {kid.current_education_year}</p>
              <p>Clase: {kidLesson ? kidLesson.name : 'Not enrolled in any class'}</p>
              <p>Evaluación: {kidEvaluation ? kidEvaluation.grade : 'No evaluacion'}</p>
              {kid.status === 'CADUCADO' && <p style={{ color: 'red' }}>CADUCADO</p>}
            </div>
          );
        })}
      </div>
      }
      {añadir === true &&
        <div className='buttons-requests'>
          <button className='button-contrast' onClick={() => descargar(person)}>Descargar</button>
          <div className='buttons-acceptance'>
            <button className='button-accept' onClick={() => aceptar(person)}>Aceptar</button>
            <button className='button-decline' onClick={() => rechazar(person)}>Rechazar</button>
          </div>
        </div>
      }
      {trash && <DeleteIcon className='trash' onClick={() => rechazar(person)} />}
    </div>
  );
}
export default PersonCard;