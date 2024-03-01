import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';

function AdminPlantilla() {
  return (
    <div className='App'>
        <HeaderAdmin />
        <div className='admin-main'>

            {/* Change selected for the name of your screen */}
            <MenuAdmin selected='Familias' />
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

export default AdminPlantilla;