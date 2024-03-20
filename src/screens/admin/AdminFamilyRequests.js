// AdminFamilyRequests.js
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import PersonCard from '../../components/PersonCard';
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

const familyItems = [
  {
    familyName: "Family Name",
    kidName: "Kid's Name"
  },
  {
    familyName: "Family Name",
    kidName: "Kid's Name"
  }
];

function AdminFamilyRequests() {
  return (
    <LayoutProfiles profile='admin' selected='Familias'>
      <Pantallas pantallas={pantallas} />
      {familyItems.map((t, index) => (
          <PersonCard key={index} person={t} añadir={true} />
      ))}
    </LayoutProfiles>
  );
}

export default AdminFamilyRequests;