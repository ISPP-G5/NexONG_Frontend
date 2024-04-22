import '../../styles/styles.css';
import Profile from '../../components/Profile'
import LayoutProfiles from '../../components/LayoutProfiles';

const EducatorProfile = () => {

  return (
    <LayoutProfiles profile={'educador'}>
      <Profile usuario={'educador'}/>
    </LayoutProfiles>
  );
};

export default EducatorProfile;