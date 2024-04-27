import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import UpdateProfile from '../../components/UpdateProfile';

const PartnerProfileUpdate = () => {

    return (
        <LayoutProfiles profile={'socios'} >
            <UpdateProfile tipo={'socios'}/>
        </LayoutProfiles>
    )
  
  };
  
  export default PartnerProfileUpdate;