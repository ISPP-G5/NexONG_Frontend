import '../styles/styles.css'
import EducatorLayout from '../components/EducatorsLayout';
import Profile from '../components/Profile'

const EducatorProfile = () => {

  return (
    <EducatorLayout>
      <Profile usuario={'educador'}/>
    </EducatorLayout>
  );
};

export default EducatorProfile;