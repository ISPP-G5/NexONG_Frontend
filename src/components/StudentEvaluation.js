import React from 'react';
import StudentCard from './StudentsCard';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';


export default function StudentEvaluation({ students, evaluationType, grade, handleGradeChange, comment, handleCommentChange, selectedDate, handleDateChange, email, phone, handleSubmit, handleCloseModal, handleCloseInfoModal, selectedStudent, getStudentEvaluation, showEditModal, showInfoModal, handleEvaluationChange, handleEdit, handleInfo }) {
    
    const inputStyle = {
        boxSizing: 'none',
        backgroundColor: 'transparent',
        width: '100%',
        marginBottom: '3%',
    };
    
    return (
    <>
      {students && students.map((student, index) => (
        <StudentCard
          key={index}
          familyName={student.name}
          kidName={student.surname}
          currentEducationYear={student.current_education_year}
          evaluation={getStudentEvaluation(student.id)}
          onEvaluationChange={(event) => handleEvaluationChange(student.id)(event)}
          onSubmit={handleSubmit}
          onEdit={() => handleEdit(student.id)}
          onInfo={() => handleInfo(student.id)}
        />
      ))}
      {showEditModal && (
        <Dialog open={showEditModal} onClose={handleCloseModal}>
          <DialogTitle>Evaluar {selectedStudent && selectedStudent.name}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <label style={{display: 'block', marginBottom: '3%'}}>
                Nota: &nbsp;
                {evaluationType === 2 ?
                <select value={grade} onChange={handleGradeChange} className='evaluation-select'>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select> :
                <select value={grade} onChange={handleGradeChange} className="evaluation-select">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                }
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