import '../../styles/styles.css';
import Profile from '../../components/Profile';
import LayoutProfiles from '../../components/LayoutProfiles';

const VolunteerProfile = () => {

  return (
    <LayoutProfiles profile={'voluntario'} >
      <Profile usuario={'voluntario'}/>
    </LayoutProfiles>
  );
};

export default VolunteerProfile;