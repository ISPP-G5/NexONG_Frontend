import '../styles/styles.css';
import LayoutProfiles from '../components/LayoutProfiles';
import UpdateProfile from '../components/UpdateProfile';
import { useParams } from 'react-router-dom'; // Importa el hook useParams


const AdminEditProfiles = () => {
  const { userId } = useParams(); // Extrae la ID de la URL

  return (
    <LayoutProfiles profile={'admin'} >
      <UpdateProfile tipo={'admin'} id={userId}/>
    </LayoutProfiles>
  );
};

export default AdminEditProfiles;