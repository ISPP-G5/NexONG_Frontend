import { BrowserRouter as Router, Route , Routes, Link} from 'react-router-dom';
import '../styles/admin-family.css';
import logo from '../logo/macn-logo.png';


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
                <div className='flex-container'>
                    <div className='family-info'>
                        <p>Name: Family 1</p>
                        <p>Information: Some information</p>
                        <p>Number of kids: 1</p>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='kids-info'>
                        <div className='kid'>
                            <p>Kid's Name: Kid 1</p>
                            <p>Class: Class 1</p>
                            <p>Evaluation: Good</p>
                        </div>
                    </div>
                </div>
                <div className='flex-container'>
                    <div className='family-info'>
                        <p>Name: Family 2</p>
                        <p>Information: Some information</p>
                        <p>Number of kids: 2</p>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='kids-info'>
                        <div className='kid'>
                            <p>Kid's Name: Kid 1</p>
                            <p>Class: Class 1</p>
                            <p>Evaluation: Good</p>
                        </div>
                        <div className='kid'>
                            <p>Kid's Name: Kid 2</p>
                            <p>Class: Class 2</p>
                            <p>Evaluation: Good</p>
                        </div>
                    </div>
                </div>
                <div className='flex-container'>
                    <div className='family-info'>
                        <p>Name: Family 3</p>
                        <p>Information: Some information</p>
                        <p>Number of kids: 3</p>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='kids-info'>
                        <div className='kid'>
                            <p>Kid's Name: Kid 1</p>
                            <p>Class: Class 1</p>
                            <p>Evaluation: Good</p>
                        </div>
                        <div className='kid'>
                            <p>Kid's Name: Kid 2</p>
                            <p>Class: Class 2</p>
                            <p>Evaluation: Good</p>
                        </div>
                        <div className='kid'>
                            <p>Kid's Name: Kid 3</p>
                            <p>Class: Class 3</p>
                            <p>Evaluation: Good</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
  );
}

export default AdminFamily;