import '../styles/styles.css';
import VolunteerLayout from '../../components/VolunteerLayout';
import UpdateProfile from '../../components/UpdateProfile';


const VolunteersProfileUpdate = () => {

    return (
         
            <VolunteerLayout>
                <UpdateProfile tipo={'voluntario'}/>
            </VolunteerLayout>
        
    )
  
  };
  
  export default VolunteersProfileUpdate;