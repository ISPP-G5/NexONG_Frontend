// AdminFamilyRequests.js
import '../../styles/styles.css';
import AdminLayout from '../../components/AdminLayout';
import FamilyCard from '../../components/FamilyCard';

function AdminFamilyRequests() {
  return (
    <AdminLayout selected='Familias'>
      <div className='pantallas'>
        <a href='/AdminFamilias'>Nuestras familias</a>
        <a href='/AdminFamiliasSolicitudes' className='selected-pantalla'>Solicitudes</a>
      </div>
      <FamilyCard familyName="Family Name" kidName="Kid's Name" />
      <FamilyCard familyName="Family Name" kidName="Kid's Name" />
    </AdminLayout>
  );
}

export default AdminFamilyRequests;