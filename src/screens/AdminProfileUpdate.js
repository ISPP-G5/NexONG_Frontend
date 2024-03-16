import '../styles/styles.css';
import AdminLayout from '../components/AdminLayout';
import UpdateProfile from '../components/UpdateProfile';


const AdminProfileUpdate = () => {

    return (
         
            <AdminLayout>
                <UpdateProfile tipo={'admin'}/>
            </AdminLayout>
        
    )
  
  };
  
  export default AdminProfileUpdate;