import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
import StudentEvaluation from '../../components/StudentEvaluation';
import 'react-toastify/dist/ReactToastify.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import EducatorEvaluationCommon from '../../components/Evaluation';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

function EducatorKidsEvaluationDaily() {
  const {
    userId, setUserId,
    educatorId, setEducatorId,
    kids, setKids,
    students, setStudents,
     setEvaluation,
    selectedStudent, 
    showEditModal,
    showInfoModal,
    comment,
    grade,
    selectedDate,
    email, setEmail,
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
    phone,setPhone,
   setStudentEvaluations,
  } = EducatorEvaluationCommon();

  

  useEffect (()=>{
    const id = localStorage.getItem('userId');
    setUserId(id);
  },[]);

  useEffect(() => {
    if (userId) {
      axios.get(`${API_ENDPOINT}user/`)
        .then(response => {
          const user = response.data.find(user => user.id == userId);
          if (user) {
            setEducatorId(user.educator);
          }
        });
    }
  }, [userId]);

  useEffect(() => {
    if (educatorId) {
      axios.get(`${API_ENDPOINT}lesson-event/`)
        .then(response => {
          const event = response.data.find(event => event.educators.includes(educatorId));
          if (event) {
            setKids(event.attendees);
          }
        });
    }
  }, [educatorId]);

  useEffect(() => {
    if (kids) {
      axios.get(`${API_ENDPOINT}student/`)
        .then(response => {
          const matchingStudents = response.data.filter(student => kids.includes(student.id));
          setStudents(matchingStudents);
  
          // Fetch evaluations
          axios.get(`${API_ENDPOINT}student-evaluation/`)
            .then(response => {
              setStudentEvaluations(response.data);
            });
  
          // Set initial evaluation state
          const initialEvaluation = {};
          matchingStudents.forEach(student => {
            initialEvaluation[student.id] = '0'; 
          });
          setEvaluation(initialEvaluation);
        });
    }
  }, [kids]);
 
  
  useEffect(() => {
    if (selectedStudent) {
      axios.get(`${API_ENDPOINT}user/`)
        .then(response => {
          const user = response.data.find(user => user.family == selectedStudent.family);
          if (user) {
            setEmail(user.email);
            setPhone(user.phone);
          }
        });
    }
  }, [selectedStudent]);


  

  return (
    <LayoutProfiles profile={'educador'} selected={'Evaluación diaria'}>
      <ToastContainer />
      <StudentEvaluation 
        students={students}
        evaluationType={2}
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
export default EducatorKidsEvaluationDaily;