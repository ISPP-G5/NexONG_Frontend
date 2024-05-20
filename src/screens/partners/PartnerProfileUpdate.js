import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import UpdateProfile from '../../components/UpdateProfile';

const PartnerProfileUpdate = () => {

    return (
        <LayoutProfiles profile={'socio'} >
            <UpdateProfile tipo={'socio'}/>
        </LayoutProfiles>
    )
  
  };
  
  export default PartnerProfileUpdate;