import Donation from './Donation';
import Suggestions from './Suggestions';
import  Register from './Register';
import LogIn from './LogIn';
import Activities from './Activities'
import Camps from './Camps';
import CoexistenceRoom from './CoexistenceRoom';
import FamilyWorkshop from './FamilyWorkshops';
import OpenRoom from './OpenRoom';
import SummerClub from './SummerClub';
import Transparency from './Transparency';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import '../styles/styles.css';
import AdminProfileUpdate from './AdminProfileUpdate';
import AdminProfile from './AdminProfile';
import HomePage from './HomePage';
import VolunteerForm from './VolunteerForm';
import AdminFamily from './AdminFamily';
import AdminFamilyRequests from './AdminFamilyRequests';


import Volunteers from './Volunteers';
import Agenda from './Agenda';
import AdminEventos from './AdminEventos';
import AdminClases from './AdminClases';
import AdminProyectos from './AdminProyectos';
import AdminCrearProyecto from './AdminCrearProyecto';



function App() {
  return (
    <Router>
      <Routes>
     
            <Route path="/" element={<HomePage />} />
            <Route path="/donaciones" element={<Donation />} />
            <Route path="/voluntarios" element={<Volunteers />} />
            <Route path="/sugerencias" element={<Suggestions />} />
            <Route path="/registrarse" element={<Register />} />
            <Route path="/iniciar-sesion" element={<LogIn />} />
            <Route path="/actividades" element={<Activities />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/aula-abierta" element={<OpenRoom />} />
            <Route path="/campamentos" element={<Camps />} />
            <Route path="/aula-convivencia" element={<CoexistenceRoom />} />
            <Route path="/form-voluntario" element={<VolunteerForm />} />
            <Route path="/talleres-familiares" element={<FamilyWorkshop />} />
            <Route path="/club-verano" element={<SummerClub />} />
            <Route path="/transparencia" exact={true} element={<Transparency />} />
            <Route path="/adminPerfil" exact={true} element={<AdminProfile />} />
            <Route path="/adminPerfilActualizar" exact={true} element={<AdminProfileUpdate />} />
            <Route path="/adminFamilias" exact={true} element={<AdminFamily />} />
            <Route path="/adminFamiliasSolicitudes" exact={true} element={<AdminFamilyRequests />} />

      


            <Route path="/adminEventos" exact={true} element={<AdminEventos />} />
            <Route path="/adminClases" exact={true} element={<AdminClases />} />
            <Route path="/adminProyectos" exact={true} element={<AdminProyectos />} />
            <Route path="/adminCrearProyecto" exact={true} element={<AdminCrearProyecto />} />

            </Routes>
    </Router>
  );
}

export default App;
