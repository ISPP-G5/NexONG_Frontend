import '../../styles/styles.css';
import UpdateProfile from '../../components/UpdateProfile';
import LayoutProfiles from '../../components/LayoutProfiles';

const PartnerProfileUpdate = () => {
    return (
        <LayoutProfiles profile={'socio'}>
            <UpdateProfile tipo={'socio'}/>
        </LayoutProfiles>      
    )
};
  
export default PartnerProfileUpdate;