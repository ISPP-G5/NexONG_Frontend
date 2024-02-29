import { BrowserRouter as Router, Route , Routes, Link} from 'react-router-dom';
import '../styles/admin-family.css';
import logo from '../logo/macn-logo.png';



function AdminFamilyRequests() {
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
                    <a>
                        <Link to={`/AdminFamily`}>
                            Nuestras familias
                        </Link>
                    </a>                 
                    <a className='selected-pantalla'>Solicitudes</a>
                </div>
                <div className='flex-container'>
                    <div className='family-request'>
                        <img src='https://via.placeholder.com/150' alt='placeholder' />
                        <div className='family-info'>
                            <p>Family Name</p>
                            <p>Kid's Name</p>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className='button'>Descargar Archivos Adjuntos</button>
                        <div className='buttons-acceptance'>
                            <button className='button-accept'>Aceptar</button>
                            <button className='button-decline'>Rechazar</button>   
                        </div>
                    </div>
                </div>
                <div className='flex-container'>
                    <div className='family-request'>
                        <img src='https://via.placeholder.com/150' alt='placeholder' />
                        <div className='family-info'>
                            <p>Family Name</p>
                            <p>Kid's Name</p>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className='button'>Descargar Archivos Adjuntos</button>
                        <div className='buttons-acceptance'>
                            <button className='button-accept'>Aceptar</button>
                            <button className='button-decline'>Rechazar</button>   
                        </div>
                    </div>
                </div>
                
            </div>
        </div>        
    </div>
  );
}

export default AdminFamilyRequests;
