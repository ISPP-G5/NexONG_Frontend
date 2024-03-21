import '../../styles/styles.css';
import ShowType from '../../components/ShowVolunteersAndEducators';


const pantallas = [
  {
    pantalla: 'Nuestros socios',
    link: '/admin/socios',
    selected: true,
  },
  {
    pantalla: 'Convocar asamblea',
    link: '/admin/socios/asamblea',
    selected: false,
  }
];

const AdminPartners = () => {
    
    return (
      <ShowType type = "SOCIO" pantallas={pantallas}></ShowType>
    );
   
}

export default AdminPartners;