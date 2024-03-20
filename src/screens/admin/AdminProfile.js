import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import Profile from '../../components/Profile'

const AdminProfile = () => {

  return (
    <LayoutProfiles profile={'admin'} >
      <Profile usuario={'admin'}/>
    </LayoutProfiles>
  );
};

export default AdminProfile;