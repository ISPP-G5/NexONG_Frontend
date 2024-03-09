import logo from '../logo/macn-logo.png';
import '../styles/styles.css';

function HeaderEducator(){
    return (
        <div className='header-volunteer'>
            <img src={logo} alt='logo'/>
            <p>Manos Abiertas Con Norte</p>
            <a href='/EducatorProfile'>Educador</a>
        </div>
        
    );
}
export default HeaderEducator; 