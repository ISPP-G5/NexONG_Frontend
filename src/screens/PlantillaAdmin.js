import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';

function AdminFamily() {
  return (
    <div className='App'>
        <HeaderAdmin />
        <div className='admin-main'>
            <div className='menu'>
                <a>Voluntarios</a>
                <a>Educadores</a>
                <a>Socios</a>
                {/* Change the selected-menu class to the screen you are in */}
                <a className='selected-menu'>Familias</a> 
                <a>Colegios</a>
                <div className='horizontal-line'></div>
                <a>Clases</a>
                <a>Eventos</a>
                <a>Proyectos</a>
            </div> 
            <div className='vertical-line'></div>  
            <div className='admin-container'>
            
                {/* Example of screen with several screens inside */}
                <div className='pantallas'>
                    <a href='/AdminFamily' className='selected-pantalla'>Nuestras familias</a>
                    <a href='/AdminFamilyRequests'>Solicitudes</a>
                </div>
                {/* Example of blue card for info */}
                <div className='card-info'>
                    <div className='family-info'>
                        <p>Name: </p>
                        <p>Information: </p>
                        <p>Number of kids:</p>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='kids-info'>
                        <div className='kid'>
                            <p>Kid's Name:</p>
                            <p>Class: </p>
                            <p>Evaluation: </p>
                        </div>
                    </div>
                </div>
                
                {/* INTRODUCE HERE YOUR IMPLEMENTATIONS */}

            </div>
        </div>        
    </div>
  );
}

export default AdminFamily;