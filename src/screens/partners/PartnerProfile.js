import '../../styles/styles.css';
import Profile from '../../components/Profile';
import LayoutProfiles from '../../components/LayoutProfiles';

const PartnerProfile = () => {

  return (
    <LayoutProfiles profile={'socio'} >
      <Profile usuario={'socio'}/>
    </LayoutProfiles>
  );
};

export default PartnerProfile;