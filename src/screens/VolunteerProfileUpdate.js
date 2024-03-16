import '../styles/styles.css';
import VolunteerLayout from '../components/VolunteerLayout';
import UpdateProfile from '../components/UpdateProfile';


const VolunteerProfileUpdate = () => {

    return (
         
            <VolunteerLayout>
                <UpdateProfile usuario={'voluntario'}/>
            </VolunteerLayout>
        
    )
  
  };
  
  export default VolunteerProfileUpdate;