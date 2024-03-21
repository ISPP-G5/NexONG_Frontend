import '../../styles/styles.css';
import ShowType from '../../components/ShowAdminProfiles';
import { useFetchUsersByRole } from '../../components/useFetchData';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const pantallas = [
  {
    pantalla: 'Nuestros educadores',
    link: '/admin/educadores',
    selected: true,
  },
  {
    pantalla: 'Añadir educador',
    link: '/admin/educadores/agregar',
    selected: false,
  }
];

function AdminEducators() {

  const userEducators = useFetchUsersByRole(API_ENDPOINT, "EDUCADOR");

  return (

    <ShowType 
      data={userEducators}
      type="Educadores" 
      pantallas={pantallas} 
    />
    
  );
}

export default AdminEducators;