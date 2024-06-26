import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/styles.css';
import ShowType from '../../components/ShowEvals';
import { useFetchMyKids, useFetchStudentDailyEval } from '../../components/useFetchData'; 
import useToken from '../../components/useToken';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function FamilyEval() {
  const { studentIndex, tipoTiempo} = useParams();
  const tiempo = tipoTiempo==='anual'? 'ANUAL':'DIARIO';
  const userId = parseInt(localStorage.getItem('userId'), 10);
  const [token] = useToken();
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(studentIndex ? parseInt(studentIndex, 10) : 0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const userStudents = useFetchMyKids(API_ENDPOINT, userId);
  const { userDailyEval, gradeTypes, lessons } = useFetchStudentDailyEval(API_ENDPOINT, token, selectedStudent, tiempo);
  const [pantallas, setPantallas] = useState([]);
  useEffect(() => {
    if (userStudents && userStudents.length > 0) {
      const screens = userStudents.map((student, index) => ({
        pantalla: student.name, 
        link: `/familia/evaluacion/${tipoTiempo}/${index}`,
        selected: index === selectedScreenIndex
      }));
      setPantallas(screens);
      setSelectedStudent(userStudents[selectedScreenIndex]);
    }
  }, [userStudents, selectedScreenIndex]);

  useEffect(() => {
    if (studentIndex) {
      setSelectedScreenIndex(parseInt(studentIndex, 10)); // Ajusta el índice seleccionado basado en la URL
    }
  }, [studentIndex]);

  return (
    <div>
      <ShowType 
        data={userDailyEval}
        student = {userStudents[selectedScreenIndex]}
        pantallas={pantallas}
        evalType={gradeTypes}
        request={false}
        lessons={lessons}
        type = {"Evaluación " + tipoTiempo}
        tiempo = {tiempo}
      />
    </div>
  );
}

export default FamilyEval;
