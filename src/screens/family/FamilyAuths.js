import '../../styles/styles.css';

import ShowType from '../../components/ShowAuths';
import  { useFetchMyAuths, useFetchNameStudent, useFetchNameEvent } from '../../components/useFetchData'; 
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const pantallas = [
  {
    pantalla: 'Autorizaciones',
    link: '/familia/autorizaciones',
    selected: true,
  },
  {
    pantalla: 'Pendientes',
    link: '/familia/autorizaciones/pendientes',
    selected: false,
  },
];

function FamilyAuths() {
  const userId = parseInt(localStorage.getItem('userId'));
  const userAuths = useFetchMyAuths(API_ENDPOINT, userId);
  const nomStudent= useFetchNameStudent(API_ENDPOINT, userAuths);
  const nomEvent= useFetchNameEvent(API_ENDPOINT, userAuths);
  return (
    <ShowType 
      data={userAuths}
      type="Auths" 
      pantallas={pantallas}
      nomStudent = {nomStudent}
      nomEvent = {nomEvent}
      request={false}
    />
    
  );
}

export default FamilyAuths;
