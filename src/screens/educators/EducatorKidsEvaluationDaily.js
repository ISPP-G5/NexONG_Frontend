import '../../styles/styles.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import StudentEvaluation from '../../components/StudentEvaluation';
import 'react-toastify/dist/ReactToastify.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import EducatorEvaluationCommon from '../../components/Evaluation';

function EducatorKidsEvaluationDaily() {
  const {
   students,
    selectedStudent, 
    showEditModal,
    showInfoModal,
    showEvaluacionModal2,
    showEvaluacionModal1,
    comment,
    grade,
    selectedDate,
    email,
    handleEvaluationChange,
    handleEdit,
    handleInfo,
    handleEvaluacion2,
    handleEvaluacion1,
    handleCloseModal,
    handleCloseEvaluacionModal2,
    handleCloseEvaluacionModal1,
    handleCloseInfoModal,
    handleCommentChange,
    handleGradeChange,
    handleSubmit,
    handleDateChange,
    getStudentEvaluation,
    phone,
    lesson,
    evaluationTypes,
   
  } = EducatorEvaluationCommon();



  

  return (
    <LayoutProfiles profile={'educador'} selected={'Evaluación diaria'}>
      <ToastContainer />
      <StudentEvaluation 
        students={students}
        grade={grade}
        handleGradeChange={handleGradeChange}
        comment={comment}
        handleCommentChange={handleCommentChange}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        email={email}
        phone={phone}
        handleSubmit={handleSubmit}
        handleCloseModal={handleCloseModal}
        handleCloseEvaluacionModal2={handleCloseEvaluacionModal2}
        handleCloseEvaluacionModal1={handleCloseEvaluacionModal1}
        handleCloseInfoModal={handleCloseInfoModal}
        selectedStudent={selectedStudent}
        getStudentEvaluation={getStudentEvaluation}
        showEditModal={showEditModal}
        showInfoModal={showInfoModal}
        showEvaluacionModal2={showEvaluacionModal2}
        showEvaluacionModal1={showEvaluacionModal1}
        handleEvaluationChange={handleEvaluationChange}
        handleEdit={handleEdit}
        handleInfo={handleInfo} 
        handleEvaluacion2={handleEvaluacion2}
        handleEvaluacion1={handleEvaluacion1}
        lessons={lesson}
        evaluationTypes={evaluationTypes}
        date ={selectedDate}

      />
    </LayoutProfiles>
  );
}
export default EducatorKidsEvaluationDaily;