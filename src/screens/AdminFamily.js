import { Link} from 'react-router-dom';
import '../styles/admin-family.css';
import logo from '../logo/macn-logo.png';

const families = [
    {
      name: 'Family 1',
      info: 'Some information',
      kids: [
        { name: 'Kid 1', class: 'Class 1', evaluation: 'Good' },
      ],
    },
    {
      name: 'Family 2',
      info: 'Some information',
      kids: [
        { name: 'Kid 1', class: 'Class 1', evaluation: 'Good' },
        { name: 'Kid 2', class: 'Class 2', evaluation: 'Good' },
      ],
    },
    {
      name: 'Family 3',
      info: 'Some information',
      kids: [
        { name: 'Kid 1', class: 'Class 1', evaluation: 'Good' },
        { name: 'Kid 2', class: 'Class 2', evaluation: 'Good' },
        { name: 'Kid 3', class: 'Class 3', evaluation: 'Good' },
      ],
    },
  ];

function AdminFamily() {
  return (
    <div className='App'>
        <div className='header'>
            <img src={logo} alt='logo'/>
            <p>Manos Abiertas Con Norte</p>
            <a>
                <Link to={`/AdminProfile`}>Admin</Link>
            </a>
        </div>
        <div className='app-container'>
            <div className='menu'>
                <a>Dashboard</a>
                <div className='horizontal-line'></div>
                <a>Voluntarios</a>
                <a>Educadores</a>
                <a>Socios</a>
                <a className='selected-menu'>Familias</a>
                <div className='horizontal-line'></div>
                <a>Clases</a>
                <a>Eventos</a>
                <a>Proyectos</a>
            </div>
            <div className='vertical-line'></div>
            <div className='main'>
                <div className='pantallas'>
                    <a className='selected-pantalla'>Nuestras familias</a>
                    <a>
                        <Link to={`/AdminFamilyRequests`}>
                            Solicitudes
                        </Link>
                    </a>
                    <div style={{textAlign:'center'}}>
                    <button className='button'
                        style={{ backgroundColor: 'aed6f1', maxHeight: '60%', margin:'4%'}}>
                          
                    </button></div>
                </div>
                <div>
                    {families.map((family, index) => (
                    <div className='flex-container' key={index}>
                        <div className='family-info'>
                            <p>Name: {family.name}</p>
                            <p>Information: {family.info}</p>
                            <p>Number of kids: {family.kids.length}</p>
                        </div>
                        <div className='vertical-line'></div>
                        <div className='kids-info'>
                            {family.kids.map((kid, kidIndex) => (
                                <div className='kid' key={kidIndex}>
                                    <p>Kid's Name: {kid.name}</p>
                                    <p>Class: {kid.class}</p>
                                    <p>Evaluation: {kid.evaluation}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>        
    </div>
  );
}

export default AdminFamily;