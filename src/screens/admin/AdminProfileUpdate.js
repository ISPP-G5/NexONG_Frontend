import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import UpdateProfile from '../../components/UpdateProfile';


const AdminProfileUpdate = () => {

    return (
        <LayoutProfiles profile={'admin'} >
            <UpdateProfile tipo={'admin'}/>
        </LayoutProfiles>
    )
  
  };
  
  export default AdminProfileUpdate;