import '../../styles/styles.css';
import VolunteerLayout from '../../components/VolunteerLayout';
import Profile from '../../components/Profile';

const VolunteersProfile = () => {

  return (
    <VolunteerLayout>
      <Profile usuario={'voluntario'}/>
    </VolunteerLayout>
  );
};

export default VolunteersProfile;