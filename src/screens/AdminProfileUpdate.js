import '../styles/styles.css';
import AdminLayout from '../components/AdminLayout';
import UpdateProfile from '../components/UpdateProfile';


const AdminProfileUpdate = () => {

    return (
         
            <AdminLayout>
                <UpdateProfile usuario={'admin'}/>
            </AdminLayout>
        
    )
  
  };
  
  export default AdminProfileUpdate;