import '../../styles/styles.css';

import ShowType from '../../components/ShowLessonEvents';
import  { useFetchMyLessonEvents, useFetchMyKids } from '../../components/useFetchData'; 
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const pantallas = [
  {
    pantalla: 'Autorizaciones',
    link: '/familia/autorizaciones',
    selected: false,
  },
  {
    pantalla: 'Pendientes',
    link: '/familia/autorizaciones/pendientes',
    selected: true,
  },
];

function FamilyAuths() {
  const userId = parseInt(localStorage.getItem('userId'));
  const userLesson_Events = useFetchMyLessonEvents(API_ENDPOINT, userId);
  const myKids = useFetchMyKids(API_ENDPOINT, userId);
  return (
    <ShowType 
      data={userLesson_Events}
      kids={myKids}
      type="Auths" 
      pantallas={pantallas}
      request={false}
    />
    
  );
}

export default FamilyAuths;
