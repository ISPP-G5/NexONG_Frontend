import '../../styles/styles.css';
import ShowType from '../../components/ShowVolunteersAndEducators';


const pantallas = [
  {
    pantalla: 'Nuestros educadores',
    link: '/admin/educadores',
    selected: true,
  },
  {
    pantalla: 'Añadir educador',
    link: '/admin/educadores/agregar',
    selected: false,
  }
];

function AdminEducators() {
  return (

    <ShowType type = "EDUCATOR" pantallas={pantallas}></ShowType>
    
  );
}

export default AdminEducators;