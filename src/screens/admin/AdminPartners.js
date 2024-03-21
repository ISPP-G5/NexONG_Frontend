import '../../styles/styles.css';
import ShowType from '../../components/ShowAdminProfiles';
import { useFetchUsersByRole } from '../../components/useFetchData';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const pantallas = [
  {
    pantalla: 'Nuestros socios',
    link: '/admin/socios',
    selected: true,
  },
  {
    pantalla: 'Convocar asamblea',
    link: '/admin/socios/asamblea',
    selected: false,
  }
];

const AdminPartners = () => {

  const userPartners = useFetchUsersByRole(API_ENDPOINT, "SOCIO");

    
  return (
  <ShowType 
    data={userPartners}
    type="Socios" 
    pantallas={pantallas} 
  />
  );
   
}

export default AdminPartners;