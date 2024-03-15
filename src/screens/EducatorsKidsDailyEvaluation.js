import React, { useEffect, useState } from 'react';
import EducatorLayout from '../components/EducatorsLayout';
import axios from 'axios';
import StudentCard from '../components/StudentsCard'; 
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import '../styles/styles.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

function KidsDailyEvaluation() {
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
      console.log('Fetched evaluations:', evaluations);
      const studentEvaluation = evaluations.find(evaluation => 
        evaluation.student === parseInt(studentId) && 
        evaluation.evaluation_type === 2 &&
        evaluation.date === selectedDate // Check if the evaluation is for the current date
      );
      console.log('Found student evaluation:', studentEvaluation);
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
          console.log(response)
          const user = response.data.find(user => user.id == userId);
          console.log('user',user)
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
          console.log('usert',response.data)
          const user = response.data.find(user => user.family == selectedStudent.family);
          if (user) {
            setEmail(user.email);
            setPhone(user.phone);
          }
        });
    }
  }, [selectedStudent]);

  console.log('students',students)
  console.log('email',email)
  console.log('phone',phone)
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
  return (
    <EducatorLayout selected='Evaluación diaria'>
      <ToastContainer />
      <div className='admin-container'></div>
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
              <label style={{display: 'block'}}>
                Nota:
                <select value={grade} onChange={handleGradeChange} className="evaluation-select">
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
              </label>
              <label>
                Comentario:
                <input type="text" value={comment} onChange={handleCommentChange} className="evaluation-select" />
              </label>
              <label>
                Fecha:
                <input type="date" value={selectedDate} onChange={handleDateChange} className="evaluation-select" />
              </label>
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
    </EducatorLayout>
  );
}
export default KidsDailyEvaluation;