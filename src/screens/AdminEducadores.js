
import '../styles/styles.css';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';

const educadores = [
    { name: 'Educador 1', class: 'Class 1' },
    { name: 'Educador 2', class: 'Class 2' },
    { name: 'Educador 3', class: 'Class 3' },
];

function EducadorCard({ name, class }) {
    return (
        <div className='card-info'>
            <div className='family-request'>
                <img src='https://via.placeholder.com/150' alt='placeholder' />
                <div className='family-info'>
                    <p>{name}</p>
                    <p>{class}</p>
                </div>
            </div>
        </div>
    );
}

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
                    {educadores.map((educador) => (
                        <EducadorCard name={educador.name} class={educador.class} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminEducador;