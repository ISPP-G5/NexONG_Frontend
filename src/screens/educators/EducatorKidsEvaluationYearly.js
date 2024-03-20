import React from 'react';
import LayoutProfiles from '../../components/LayoutProfiles';
import StudentEvaluation from '../../components/StudentEvaluation';
import '../../styles/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EducatorEvaluationCommon from '../../components/Evaluation';

function EducatorKidsEvaluationYearly() {
  const {
    students, 
    selectedStudent,
    showEditModal,
    showInfoModal, 
    comment,
    grade, 
    selectedDate, 
    email,
    handleEvaluationChange,
    handleEdit,
    handleInfo,
    handleCloseModal,
    handleCloseInfoModal,
    handleCommentChange,
    handleGradeChange,
    handleSubmit,
    handleDateChange,
    getStudentEvaluation,
    phone,
    
  } = EducatorEvaluationCommon();
  
 

  


  return (
    
    <LayoutProfiles profile={'educador'} selected={'Evaluación anual Niños'}>
       <ToastContainer />
       <StudentEvaluation 
        students={students}
        evaluationType={1}
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
        handleCloseInfoModal={handleCloseInfoModal}
        selectedStudent={selectedStudent}
        getStudentEvaluation={getStudentEvaluation}
        showEditModal={showEditModal}
        showInfoModal={showInfoModal}
        handleEvaluationChange={handleEvaluationChange}
        handleEdit={handleEdit}
        handleInfo={handleInfo} 
      />      
    </LayoutProfiles>
  );
}

export default EducatorKidsEvaluationYearly;