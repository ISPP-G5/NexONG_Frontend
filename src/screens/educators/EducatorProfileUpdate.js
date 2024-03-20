import '../../styles/styles.css';
import UpdateProfile from '../../components/UpdateProfile';
import LayoutProfiles from '../../components/LayoutProfiles';


const EducatorProfileUpdate = () => {

    return (
        <LayoutProfiles profile={'educador'} >
            <UpdateProfile tipo={'educador'}/>
        </LayoutProfiles>
    )
  
  };
  
  export default EducatorProfileUpdate;