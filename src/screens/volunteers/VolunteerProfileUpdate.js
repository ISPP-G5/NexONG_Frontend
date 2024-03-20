import '../../styles/styles.css';
import UpdateProfile from '../../components/UpdateProfile';
import LayoutProfiles from '../../components/LayoutProfiles';

const VolunteerProfileUpdate = () => {

    return (
         
        <LayoutProfiles profile={'voluntario'}>
            <UpdateProfile tipo={'voluntario'}/>
        </LayoutProfiles>
        
    )
  
  };
  
  export default VolunteerProfileUpdate;