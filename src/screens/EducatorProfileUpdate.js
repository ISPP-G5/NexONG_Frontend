import '../styles/styles.css';
import EducatorLayout from '../components/EducatorsLayout';
import UpdateProfile from '../components/UpdateProfile';


const EducatorProfileUpdate = () => {

    return (
         
            <EducatorLayout>
                <UpdateProfile usuario={'educador'}/>
            </EducatorLayout>
        
    )
  
  };
  
  export default EducatorProfileUpdate;