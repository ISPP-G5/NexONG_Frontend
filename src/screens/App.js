import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import '../styles/styles.css';
import AdminProfileUpdate from './admin/AdminProfileUpdate';
import AdminProfile from './admin/AdminProfile';



function App() {
  return (
    <><div className="App">
      <div className='header'>
        <div>
          <ul><li>
            <a>Actividades</a>
            <ul>
              <li><a>Campamentos</a></li>
              <li><a>Clases</a></li>
            </ul>
          </li></ul>
        </div>
        <a>Donaciones</a>
        <a>Sugerencias</a>
        <a>Registrase</a>
        <a>Iniciar Sesión</a>
      </div>
      <div className='main'>
        <div className='title-text'>Esto es un Título</div>
        <div className='text'>Esto es un ejemplo de texto para la información
          de las pantallas de la HomePage</div>

        <div className='flex-container'>
          <div className='field-text'>Nombre</div>
          <input type='text' placeholder='Name'></input>
          <input type='text' placeholder='Name'></input>
          <input type='text' placeholder='Name'></input>
          <select placeholder='Name'>
            <option>campamentos</option>
            <option>actividades</option>
          </select>
          <button className='button'>Enviar</button>
        </div>
      </div>

      <div className='menu'>
        <a>Voluntarios</a>
        <a>Educadores</a>
        <a>Familias</a>
      </div>

      <div className='footer'>
        <div className='header-text'>Actividades</div>
        <div className='header-text'>Donaciones</div>
        <div className='header-text'>Sugerencias</div>
        <div className='header-text'>Registrase</div>
        <div className='header-text'>Inciar Sesión</div>
      </div>
    </div><Router>
        <Routes>
          <Route path="/adminProfile" exact={true} element={<AdminProfile />} />
          <Route path="/adminProfileUpdate" exact={true} element={<AdminProfileUpdate />} />
        </Routes>
      </Router></>
  );
}

export default App;
