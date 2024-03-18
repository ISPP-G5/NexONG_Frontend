// AdminFamilyRequests.js
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import FamilyCard from '../../components/FamilyCard';
import Pantallas from '../../components/Pantallas';

const pantallas = [
  {
    pantalla: 'Nuestras familias',
    link: '/admin/familias',
    selected: false,
  },
  {
    pantalla: 'Solicitudes',
    link: '/admin/familias/solicitudes',
    selected: true,
  }
];

function AdminFamilyRequests() {
  return (
    <LayoutProfiles profile='admin' selected='Familias'>
      <Pantallas pantallas={pantallas} />
      <FamilyCard familyName="Family Name" kidName="Kid's Name" />
      <FamilyCard familyName="Family Name" kidName="Kid's Name" />
    </LayoutProfiles>
  );
}

export default AdminFamilyRequests;