import { Link} from 'react-router-dom';
import '../styles/styles.css';
import logo from '../logo/macn-logo.png';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';



function AdminFamilyRequests() {
  return (
    <div className='App'>
        <HeaderAdmin />
        <div className='admin-main'>
            <MenuAdmin />
            <div className='vertical-line'></div>
            <div className='admin-container'>
                <div className='pantallas'>
                    <a href='/AdminFamily'>Nuestras familias</a>
                    <a href='/AdminFamilyRequests' className='selected-pantalla'>Solicitudes</a>
                </div>
                <div className='card-info'>
                    <div className='family-request'>
                        <img src='https://via.placeholder.com/150' alt='placeholder' />
                        <div className='family-info'>
                            <p>Family Name</p>
                            <p>Kid's Name</p>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className='button-contrast'>Descargar Archivos Adjuntos</button>
                        <div className='buttons-acceptance'>
                            <button className='button-accept'>Aceptar</button>
                            <button className='button-decline'>Rechazar</button>   
                        </div>
                    </div>
                </div>
                <div className='card-info'>
                    <div className='family-request'>
                        <img src='https://via.placeholder.com/150' alt='placeholder' />
                        <div className='family-info'>
                            <p>Family Name</p>
                            <p>Kid's Name</p>
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className='button-contrast'>Descargar Archivos Adjuntos</button>
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
