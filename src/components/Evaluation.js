import { useState,useEffect } from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

export default function EducatorEvaluationCommon() {
  const [userId,setUserId] = useState(null);
  const [educatorId,setEducatorId] = useState(null);
  const [kids,setKids] = useState(null);
  const [students,setStudents] = useState(null);
  const [evaluation,setEvaluation] = useState({});
  const [selectedStudent,setSelectedStudent] = useState(null);
  const [showEditModal,setShowEditModal] = useState(false);
  const [showInfoModal,setShowInfoModal] = useState(false);
  const [showEvaluacionModal2,setShowEvaluacionModal2] = useState(false);

  const [comment, setComment] = useState("");
  const [grade, setGrade] = useState("");
  const [lesson,setLesson] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [studentEvaluations, setStudentEvaluations] = useState([]); 
  const [evaluationTypes,setEvaluationTypes] = useState([]);
  const [lastEvaluation, setLastEvaluation] = useState(null);

  const handleEvaluationChange = (id) => (event) => {
    setEvaluation((prevEvaluation) => ({
      ...prevEvaluation,
      [id]: event.target.value,
    }));
  };
 
  useEffect(() => {
    const id = localStorage.getItem('userId');
    setUserId(id);
  }, []);

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
    axios.get(`${API_ENDPOINT}evaluation-type/`)
      .then(response => {
        console.log('evaluation types',response.data)
        setEvaluationTypes(response.data);
      });
 
  
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: evaluations } = await axios.get(`${API_ENDPOINT}student-evaluation/`);
        setStudentEvaluations(evaluations);
        console.log('student evaluations',evaluations)
      } catch (error) {
        console.error('Error fetching student evaluations:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    if (educatorId) {
      axios.get(`${API_ENDPOINT}lesson/`)
        .then(response => {
          const lessons = response.data.filter(lesson => lesson.educator === educatorId);
          if (lessons.length > 0) {
            const allStudents = lessons.reduce((students, lesson) => [...students, ...lesson.students], []);
            console.log('allStudents',allStudents)
  
            setKids(allStudents);
            setLesson(lessons)
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
      });
  }
}, [kids]);


  const handleEdit = (id) => {
    const student = students.find(student => student.id === id);
    setSelectedStudent(student);
    setShowEditModal(true);
  };
  useEffect(() => {
    if (selectedStudent) {
      console.log(selectedStudent);
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

  const handleInfo = (id) => {
    const student = students.find(student => student.id === id);
    setSelectedStudent(student);
    setShowInfoModal(true);
  };

  const handleEvaluacion2 = (id) => {
    const student = students.find(student => student.id === id);
    setSelectedStudent(student);
    setShowEvaluacionModal2(true);
  };
  const handleEvaluacion1 = (id) => {
    const student = students.find(student => student.id === id);
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  const handleCloseEvaluacionModal2 = () => {
    setShowEvaluacionModal2(false);
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

        if (selectedDateObj.getTime() > today.getTime()) {
          console.log('Cannot create an evaluation for a future date');
          toast.error('No puede evaluar en una fecha futura');
          return;
        }
  
      const studentId = selectedStudent.id;
      
    
     
      const { data: evaluations } = await axios.get(`${API_ENDPOINT}student-evaluation/`);

      const studentEvaluation = evaluations.find(evaluation => 
        evaluation.student === parseInt(studentId) && 
        evaluation.evaluation_type === evaluationTypes &&
        evaluation.date === selectedDate
      );
  console.log('grade',grade)
      if (studentEvaluation) {
        console.log('Updating evaluation with grade:', grade, 'and comment:', comment);
        const updateResponse = await axios.patch(`${API_ENDPOINT}student-evaluation/${studentEvaluation.id}/`, {
          ...studentEvaluation,
          grade: parseInt(grade, 10), 
          comment: comment, 
          date: selectedDate, 
        });
        console.log('Update response:', updateResponse);
        if (updateResponse.status === 200) {
          console.log('Evaluation updated successfully');
          toast.success('Evaluación realizada de manera correcta');
          setStudentEvaluations(prevEvaluations => prevEvaluations.map(evaluation => 
            evaluation.id === studentEvaluation.id ? updateResponse.data : evaluation
          ));
          setLastEvaluation(updateResponse.data);

          handleCloseModal();
        } else {
          console.log('Failed to update evaluation');
          toast.error('Error al evaluar al estudiante');
        }
      } else {
        
          
        console.log('evaluation type evaluation.js',evaluationTypes)
        console.log(' comment',comment)
        console.log(' grade',evaluationTypes)
        console.log('date',selectedDate)
        console.log()
        console.log('Creating new evaluation with grade:', grade, 'and comment:', comment);
        const createResponse = await axios.post(`${API_ENDPOINT}student-evaluation/`, {
          grade: parseInt(grade, 10), 
          date: selectedDate, 
          comment: comment,
          student: parseInt(studentId),
          evaluation_type: Object.keys(evaluation)[0],
          
        });
        console.log('Create response:', createResponse);

        if (createResponse.status === 201) {
          console.log('Evaluation created successfully');
          toast.success('Evaluación realizada de manera correcta');
          setStudentEvaluations(prevEvaluations => [...prevEvaluations, createResponse.data]);
          setLastEvaluation(createResponse.data);
          handleCloseModal();
        } else {
          console.log('Failed to create evaluation');
          toast.error('Error al evaluar al estudiante');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('Todos los campos son obligatorios');
    }
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const getStudentEvaluation = (studentId) => {
    // Ensure evaluationTypes is populated before filtering evaluations
    if (!evaluationTypes || evaluationTypes.length === 0) {
      console.log('Evaluation types not loaded yet');
      return [];
    }
  
    console.log('studentId:', studentId);
    
    console.log('before filter:', studentEvaluations);
    console.log('evaluationTypes:', evaluationTypes[0].evaluation_type, evaluationTypes[1]);
    const filteredEvaluations = studentEvaluations.filter(evaluation => 
      evaluation.student === parseInt(studentId)
    );
    console.log('Filtered evaluations for student:', filteredEvaluations);
    
    if (filteredEvaluations.length === 0) {
      return ['Sin evaluar'];
    }
  
    filteredEvaluations.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log('Sorted evaluations:', filteredEvaluations);
  
    console.log('All evaluations:', filteredEvaluations);
    return filteredEvaluations;
  };
  
  
  
  
  


  return {
    
    userId, setUserId,
    educatorId, setEducatorId,
    kids, setKids,
    students, setStudents,
    evaluation, setEvaluation,
    selectedStudent, setSelectedStudent,
    showEditModal, setShowEditModal,
    showInfoModal, setShowInfoModal,
    showEvaluacionModal2, setShowEvaluacionModal2,
    comment, setComment,
    grade, setGrade,
    selectedDate, setSelectedDate,
    email, setEmail,
    handleEvaluationChange,
     handleEdit,
     handleInfo,
     handleEvaluacion2,
     handleEvaluacion1,
     handleCloseModal,
     handleCloseEvaluacionModal2,
     handleCloseInfoModal,
     handleCommentChange,
     handleGradeChange,
     handleSubmit,
     handleDateChange,
     getStudentEvaluation,
     phone,setPhone,
     studentEvaluations, setStudentEvaluations,
     lesson,setLesson,
     evaluationTypes,setEvaluationTypes
  };
}
