import React, { useEffect, useState } from 'react';
import StudentCard from './StudentsCard';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';


export default function StudentEvaluation({ students, evaluationTypes, evaluation, grade, handleGradeChange, comment, handleCommentChange, selectedDate, handleDateChange, email, phone, handleSubmit, handleCloseModal,handleCloseEvaluacionModal2, handleCloseEvaluacionModal1,handleCloseInfoModal, selectedStudent, getStudentEvaluation, showEditModal, showInfoModal, showEvaluacionModal2, showEvaluacionModal1, handleEvaluationChange, handleEdit, handleInfo, handleEvaluacion1, handleEvaluacion2,lessons }) {
  const inputStyle = {
    boxSizing: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: '3%',
  };
  const [selectedLesson,setSelectedLesson] = useState ([]);
  const [studentsInSelectedLesson,setStudentInSelectedLesson] = useState([])
  const handleLessonChange = (event) => {
    setSelectedLesson(event.target.value);
  };

  useEffect(() => {
    
    if (students && lessons && selectedLesson) {
      const selectedLessonObj = lessons.find(lesson => lesson.id == selectedLesson);
      if (selectedLessonObj && Array.isArray(selectedLessonObj.students)) {
        const studentsInSelectedLessonFilter = students.filter(student => selectedLessonObj.students.includes(student.id));
        
        setStudentInSelectedLesson(studentsInSelectedLessonFilter)
        handleEvaluationChange(setStudentInSelectedLesson.id)({target:{value:setStudentInSelectedLesson.id}});

      }
    }
  }, [students, lessons, selectedLesson]);


  return (
    <>
      <label>Selecciona una clase:</label>
      <select  className='evaluation-filter' onChange={handleLessonChange}>
         <option value="">Selecciona una clase</option>
        {lessons && lessons.map((lesson, index) => (
          <option key={index} value={lesson.id}>{lesson.name}</option>
        ))}
      </select>
  
      {selectedLesson ? (
        studentsInSelectedLesson.map((student) => {
          const lesson = lessons.find(lesson => lesson.students.includes(student.id));
          if (!lesson) {
            return <p>No existe ninguna información para mostrar</p>; 
           }
        return (
          <StudentCard
          key={student.id}
          familyName={student.name}
          kidName={student.surname}
          lesson={lesson.name}
          currentEducationYear={student.current_education_year}
          evaluation={getStudentEvaluation(student.id)}
          onEvaluationChange={(event) => handleEvaluationChange(setStudentInSelectedLesson.id)(event)}
          onSubmit={handleSubmit}
          onEdit={() => handleEdit(student.id)}
          onInfo={() => handleInfo(student.id)}
          onEval={() => handleLessonChange(student.id)}
         />
         );
        })
      ) : (
        <p className='no-info'>Por favor, selecciona una clase.</p>
)}
 
{showEditModal && (
  <Dialog open={showEditModal} onClose={handleCloseModal}>
    <DialogTitle>Evaluar {selectedStudent && selectedStudent.name}</DialogTitle>
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <label style={{display: 'block', marginBottom: '3%'}}>Notas: </label>
          {evaluationTypes && evaluationTypes.map((evaluationType, index) => {
            let lessonsIds;
            let evaluationTypeIds
            if (lessons) {
              lessonsIds = lessons.map(lesson => lesson.id);
              evaluationTypeIds = evaluationType.lesson

            }
            let dailyEvaluations;
            if (evaluationType) {
              dailyEvaluations = evaluationTypes.filter(evaluationType => evaluationType.evaluation_type === 'DIARIO');

              if (dailyEvaluations) {
                const selectedStudentLesson = lessons.find(lesson => lesson.students.includes(selectedStudent.id));
              
                if (!selectedStudentLesson) {
                  return null;
                }
                const defaultGrade = evaluationType.grade_system === 'CERO A UNO' ? 0 : 1;

               
              
              
                return selectedStudentLesson && selectedStudentLesson.id === evaluationTypeIds ? (

                  <select value={grade || defaultGrade} onChange={handleGradeChange} style={{width: '100%'}} key={index}>
                    <option value={0}>0</option>
                    {evaluationType.grade_system === 'CERO A UNO' && 
                      ['1'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                    }
                    {evaluationType.grade_system === 'UNO A CINCO' && 
                      [ '2', '3', '4', '5'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                    }
                    {evaluationType.grade_system === 'CERO A DIEZ' && 
                      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                    }
                  </select>
                ) : null;
              }
              else if ( evaluationTypes.filter(evaluationType => evaluationType.evaluation_type === 'ANUAL')){
                const selectedStudentLesson = lessons.find(lesson => lesson.students.includes(selectedStudent.id));
              
                if (!selectedStudentLesson) {
                  return null;
                }
              
                
                const defaultGrade = evaluationType.grade_system === 'CERO A UNO' ? 0 : 1;

                return selectedStudentLesson && selectedStudentLesson.id === evaluationTypeIds ? (
                  <select value={grade || defaultGrade} onChange={handleGradeChange} style={{width: '100%'}} key={index}>
                    <option value={0}>0</option>
                    {evaluationType.grade_system === 'CERO A UNO' && 
                      ['1'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                    }
                    {evaluationType.grade_system === 'UNO A CINCO' && 
                      [ '2', '3', '4', '5'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                    }
                    {evaluationType.grade_system === 'CERO A DIEZ' && 
                      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                    }
                  </select>
                ) : null;
              }

              
            }
            return null; 
          })}
        <label>Comentario:</label>
        <input type="text" value={comment} onChange={handleCommentChange} style={inputStyle} />
        <label>Fecha:</label>
        <input type="date" value={selectedDate} onChange={handleDateChange} style={inputStyle} />
        
        </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseModal} color="primary">
        Cancelar
      </Button>
      <Button onClick={handleSubmit} color="primary">
        Enviar
      </Button>
    </DialogActions>
  </Dialog>
)}
{showEvaluacionModal2 && (
  <Dialog open={showEvaluacionModal2} onClose={handleCloseEvaluacionModal2}>
    <DialogTitle>Evaluaciones de {selectedStudent && selectedStudent.name}</DialogTitle>
    <DialogContent>
      {selectedStudent && getStudentEvaluation(selectedStudent.id).map((evalItem, index) => {
        // Check if the evaluation type is daily (evaluation_type === 2)
          return (
            <div key={index}>
              <strong>Fecha: {evalItem.date}</strong>
              <p>Nota: {evalItem.grade}</p>
              <p>Comentario: {evalItem.comment}</p>
            </div>
          );
        
        
      })}
      
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseEvaluacionModal2} color="primary">
        Cerrar
      </Button>
    </DialogActions>
  </Dialog>
)}

     


{showInfoModal && (
  <Dialog open={showInfoModal} onClose={handleCloseInfoModal}>
    <DialogTitle>Información de {selectedStudent && selectedStudent.name}</DialogTitle>
    <DialogContent>
      <p>Nombre: {selectedStudent && selectedStudent.name}</p>
      <p>Apellido: {selectedStudent && selectedStudent.surname}</p>
      <p>Email: {selectedStudent && email}</p>
      <p>Teléfono: {selectedStudent && phone}</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseInfoModal} color="primary">
        Cerrar
      </Button>
    </DialogActions>
  </Dialog>
)}


</>
);
}