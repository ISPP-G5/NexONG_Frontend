import '../../styles/styles.css';
import UpdateProfile from '../../components/UpdateProfile';
import LayoutProfiles from '../../components/LayoutProfiles';

const VolunteerProfileUpdate = () => {

    return (
         
        <LayoutProfiles profile={'familia'}>
            <UpdateProfile tipo={'familia'}/>
        </LayoutProfiles>
        
    )
  
  };
  
  export default VolunteerProfileUpdate;