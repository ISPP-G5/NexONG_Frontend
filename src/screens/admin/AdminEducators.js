import '../../styles/styles.css';
import ShowType from '../../components/ShowAdminProfiles';
import { useFetchUsersByRole } from '../../components/useFetchData';
import useToken from '../../components/useToken';
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
  const [token, updateToken] = useToken();
  const userEducators = useFetchUsersByRole(API_ENDPOINT, "EDUCADOR", token);

  return (

    <ShowType 
      data={userEducators}
      type="Educadores" 
      pantallas={pantallas} 
    />
    
  );
}

export default AdminEducators;