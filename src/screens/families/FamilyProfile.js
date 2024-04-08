import '../../styles/styles.css';
import Profile from '../../components/Profile';
import LayoutProfiles from '../../components/LayoutProfiles';

const VolunteerProfile = () => {

  return (
    <LayoutProfiles profile={'familia'} >
      <Profile usuario={'familia'}/>
    </LayoutProfiles>
  );
};

export default VolunteerProfile;