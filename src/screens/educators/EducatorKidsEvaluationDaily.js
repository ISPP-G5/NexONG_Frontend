import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
import StudentEvaluation from '../../components/StudentEvaluation';
import 'react-toastify/dist/ReactToastify.css';
import LayoutProfiles from '../../components/LayoutProfiles';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

function EducatorKidsEvaluationDaily() {
  const [userId,setUserId] = useState(null);
  const [educatorId,setEducatorId] = useState(null);
  const [kids,setKids] = useState(null);
  const [students,setStudents] = useState(null);
  const [evaluation,setEvaluation] = useState({});
  const [selectedStudent,setSelectedStudent] = useState(null);
  const [showEditModal,setShowEditModal] = useState(false);
  const [showInfoModal,setShowInfoModal] = useState(false);
  const [comment, setComment] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [studentEvaluations, setStudentEvaluations] = useState([]);

  const handleEvaluationChange = (id) => (event) => {
    setEvaluation((prevEvaluation) => ({
      ...prevEvaluation,
      [id]: event.target.value,
    }));
  };

 
  const handleEdit = (id) => {
    const student = students.find(student => student.id === id);
    setSelectedStudent(student);
    setShowEditModal(true);
  };
  const handleInfo = (id) => {
    const student = students.find(student => student.id === id);
    setSelectedStudent(student);
    setShowInfoModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };
  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const selectedDateObj = new Date(selectedDate);
        selectedDateObj.setHours(0, 0, 0, 0); 

        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        // Check if selectedDate is in the future
        if (selectedDateObj.getTime() > today.getTime()) {
          console.log('Cannot create an evaluation for a future date');
          toast.error('No puede evaluar en una fecha futura');
          return;
        }
      
      const studentId = selectedStudent.id;
      const { data: evaluations } = await axios.get(`${API_ENDPOINT}student-evaluation/`);
      const studentEvaluation = evaluations.find(evaluation => 
        evaluation.student === parseInt(studentId) && 
        evaluation.evaluation_type === 2 &&
        evaluation.date === selectedDate // Check if the evaluation is for the current date
      );
      if (studentEvaluation) {
        console.log('Updating evaluation with grade:', grade, 'and comment:', comment);
        const updateResponse = await axios.put(`${API_ENDPOINT}student-evaluation/${studentEvaluation.id}/`, {
          ...studentEvaluation,
          grade: parseInt(grade, 10), // Update the grade
          comment: comment, // Update the comment
        });
        console.log('Update response:', updateResponse);
        if (updateResponse.status === 200) {
          console.log('Evaluation updated successfully');
          toast.success('Evaluación realizada de manera correcta');
          setStudentEvaluations(prevEvaluations => prevEvaluations.map(evaluation => 
            evaluation.id === studentEvaluation.id ? updateResponse.data : evaluation
          ));
          handleCloseModal();
        } else {
          console.log('Failed to update evaluation');
          toast.error('Error al evaluar al estudiante');
        }
      } else {
        console.log('Creating new evaluation with grade:', grade, 'and comment:', comment);
        const createResponse = await axios.post(`${API_ENDPOINT}student-evaluation/`, {
          grade: parseInt(grade, 10), // Parse grade to integer
          date: selectedDate, // Use current date
          comment: comment,
          student: parseInt(studentId),
          evaluation_type: 2,
        });
        console.log('Create response:', createResponse);
  
        if (createResponse.status === 201) {
          console.log('Evaluation created successfully');
          toast.success('Evaluación realizada de manera correcta');
          setStudentEvaluations(prevEvaluations => [...prevEvaluations, createResponse.data]);
          handleCloseModal();
        } else {
          console.log('Failed to create evaluation');
          toast.success('Error al evaluar al estudiante');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('Todos los campos son obligatorios')
    }
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

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


  const getStudentEvaluation = (studentId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set the time to 00:00:00
  
    const filteredEvaluations = studentEvaluations.filter(evaluation => 
      evaluation.student === parseInt(studentId) && 
      evaluation.evaluation_type === 2 &&
      new Date(evaluation.date).setHours(0, 0, 0, 0) === today.getTime() // check if the evaluation date is today
    );
  
    if (filteredEvaluations.length === 0) {
      return 'Sin evaluar';
    }
  
    // Return the grade of the evaluation for the current day
    return filteredEvaluations[0].grade;
  };

  const inputStyle = {
    boxSizing: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: '3%',
  };

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