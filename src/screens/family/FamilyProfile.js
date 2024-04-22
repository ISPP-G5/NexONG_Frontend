import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import Profile from '../../components/Profile'

const FamilyProfile = () => {

  return (
    <LayoutProfiles profile={'familia'} >
      <Profile usuario={'familia'}/>
    </LayoutProfiles>
  );
};

export default FamilyProfile;