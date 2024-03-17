import '../styles/styles.css'
import AdminLayout from '../../components/AdminLayout';
import Profile from '../../components/Profile'

const AdminProfile = () => {

  return (
    <AdminLayout>
      <Profile usuario={'admin'}/>
    </AdminLayout>
  );
};

export default AdminProfile;