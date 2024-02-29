import logo from '../logo/macn-logo.png';
import {Link} from 'react-router-dom';
import '../styles/styles.css';

function MenuAdmin(){
    return (
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
    );
}
export default MenuAdmin; 