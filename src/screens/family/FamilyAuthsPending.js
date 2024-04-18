import '../../styles/styles.css';

import ShowType from '../../components/ShowLessonEvents';
import  { useFetchMyLessonEvents, useFetchMyKids } from '../../components/useFetchData'; 
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const pantallas = [
  {
    pantalla: 'Autorizaciones hechas',
    link: '/familia/autorizaciones',
    selected: false,
  },
  {
    pantalla: 'Eventos disponibles',
    link: '/familia/autorizaciones/pendientes',
    selected: true,
  },
];

function FamilyAuths() {
  const userId = parseInt(localStorage.getItem('userId'), 10);
  const userLesson_Events = useFetchMyLessonEvents(API_ENDPOINT, userId);
  const myKids = useFetchMyKids(API_ENDPOINT, userId);
  return (
    <>
    <ShowType 
      data={userLesson_Events}
      kids={myKids}
      type="Autorizaciones" 
      pantallas={pantallas}
      request={false}
    />
  </>
  );
}

export default FamilyAuths;
