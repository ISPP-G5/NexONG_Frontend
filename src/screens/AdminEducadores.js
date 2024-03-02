import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';

const educadores = [
    {
      name: 'Educador 1',
      info: 'Some information',
      Educador: [
        { name: 'Educador 1', class: 'Class 1' },
      ],
    },
    {
      name: 'Educador 2',
      info: 'Some information',
      Educador: [
        { name: 'Educador 2', class: 'Class 2' },
      ],
    },
    {
      name: 'Educador 3',
      info: 'Some information',
      Educador: [
        { name: 'Educador 3', class: 'Class 3' },
      ],
    },
  ];

function AdminEducador() {
  return (
    <div className='App'>
        <HeaderAdmin />
        <div className='admin-main'>
            <MenuAdmin selected='Educadores' />
            <div className='vertical-line'></div>
            
            <div className='admin-container'>
                <div className='pantallas'>
                    <a href='/AdminEducadores'>Nuestros educadores</a>
                   
                </div>
                <div className='card-info'>
                    <div className='family-request'>
                        <img src='https://via.placeholder.com/150' alt='placeholder' />
                        <div className='family-info'>
                            <p>Nombre educador </p>
                            <p>Clase 1</p>
                        </div>
                    </div>
                   
                </div>
                <div className='card-info'>
                    <div className='family-request'>
                        <img src='https://via.placeholder.com/150' alt='placeholder' />
                        <div className='family-info'>
                            <p>Nombre educador</p>
                            <p>Clase 2</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>        
    </div>
  );
}


export default AdminEducador;