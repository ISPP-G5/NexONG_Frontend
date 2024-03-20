import React from 'react';
import StudentCard from './StudentsCard';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
export default function StudentEvaluation({ students, evaluationTypes, grade, handleGradeChange, comment, handleCommentChange, selectedDate, handleDateChange, email, phone, handleSubmit, handleCloseModal, handleCloseInfoModal, selectedStudent, getStudentEvaluation, showEditModal, showInfoModal, handleEvaluationChange, handleEdit, handleInfo, lessons }) {
  const inputStyle = {
    boxSizing: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: '3%',
  };

  return (
    <>
      {students && lessons && students.map((student, studentIndex) => {
       
        const lesson = lessons.find(lesson => lesson.students.includes(student.id));
        console.log('lesson student',lesson)
        if (!lesson) {
          return null; 
        }

        return (
          <StudentCard
            key={studentIndex}
            familyName={student.name}
            kidName={student.surname}
            lesson={lesson.name}
            currentEducationYear={student.current_education_year}
            evaluation={getStudentEvaluation(student.id)}
            onEvaluationChange={(event) => handleEvaluationChange(student.id)(event)}
            onSubmit={handleSubmit}
            onEdit={() => handleEdit(student.id)}
            onInfo={() => handleInfo(student.id)}
          />
        );
      })}

{showEditModal && (
  <Dialog open={showEditModal} onClose={handleCloseModal}>
    <DialogTitle>Evaluar {selectedStudent && selectedStudent.name}</DialogTitle>
    <DialogContent>
      <form onSubmit={handleSubmit}>
        <label style={{display: 'block', marginBottom: '3%'}}>Notas:
          {evaluationTypes && evaluationTypes.map((evaluationType, index) => {
            let lessonsIds;
            let evaluationTypeIds
            console.log('lessons',lessons)
            if (lessons) {
              lessonsIds = lessons.map(lesson => lesson.id);
              evaluationTypeIds = evaluationType.lesson
              console.log('evaluationTypeIds',evaluationTypeIds)
            }
            let dailyEvaluations;
            console.log('evaluationType',evaluationType)
            if (evaluationType) {
              dailyEvaluations = evaluationTypes.filter(evaluationType => evaluationType.evaluation_type === 'DIARIO');

              if (dailyEvaluations) {
                const selectedStudentLesson = lessons.find(lesson => lesson.students.includes(selectedStudent.id));
                console.log('selected student lesson', selectedStudentLesson)
              
                if (!selectedStudentLesson) {
                  return null;
                }
                console.log('selected student lesson',selectedStudentLesson)
                console.log('lesons ids',lessonsIds)
              
                return selectedStudentLesson && selectedStudentLesson.id === evaluationTypeIds ? (
                  <select value={grade} onChange={handleGradeChange} className='evaluation-select' key={index}>
                  {evaluationType.grade_system === 'CERO A UNO' && 
                    ['0', '1'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                  }
                  {evaluationType.grade_system === 'UNO A CINCO' && 
                    ['1', '2', '3', '4', '5'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                  }
                  {evaluationType.grade_system === 'UNO A DIEZ' && 
                    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                  }
                </select>
                ) : null;
              }
              else if ( evaluationTypes.filter(evaluationType => evaluationType.evaluation_type === 'ANNUAL')){
                const selectedStudentLesson = lessons.find(lesson => lesson.students.includes(selectedStudent.id));
                console.log('selected student lesson', selectedStudentLesson)
              
                if (!selectedStudentLesson) {
                  return null;
                }
                console.log('selected student lesson',selectedStudentLesson)
                console.log('lesons ids',lessonsIds)
              
                return selectedStudentLesson && selectedStudentLesson.id === evaluationTypeIds ? (
                  <select value={grade} onChange={handleGradeChange} className='evaluation-select' key={index}>
                  {evaluationType.grade_system === 'CERO A UNO' && 
                    ['0', '1'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                  }
                  {evaluationType.grade_system === 'UNO A CINCO' && 
                    ['1', '2', '3', '4', '5'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                  }
                  {evaluationType.grade_system === 'UNO A DIEZ' && 
                    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((grade, index) => <option key={index} value={grade}>{grade}</option>)
                  }
                </select>
                ) : null;
              }

              
            }
            return null; 
          })}
        </label>
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