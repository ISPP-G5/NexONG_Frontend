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
import AboutUs from './AboutUs';
import History from './History';
import MisionOverviewValues from './MisionOverviewValues';
import Association from './Association';
import AdminFamily from './AdminFamily';
import AdminFamilyRequests from './AdminFamilyRequests';
import ColaboratorEntities from './ColaboratorEntities';
import WhereWeAre from './WhereWeAre';



import Volunteers from './Volunteers';
import Agenda from './Agenda';
import AdminEventos from './AdminEventos';
import AdminClases from './AdminClases';
import AdminProyectos from './AdminProyectos';
import AdminCrearProyecto from './AdminCrearProyecto';

import VolunteerAgenda from './VolunteerAgenda';



import KidsDailyEvaluation from './EducatorsKidsDailyEvaluation';
import KidsYearlyEvaluation from './EducatorsKidsYearlyEvaluation';
import EducatorsActivities from './EducatorsActivities';
import ProyectsQuarterlyEvaluation from './EducatorsProyectsQuarterlyEvaluation';
import ProjectsYearlyEvaluation from './EducatorsProyectsYearlyEvaluation';
import EducatorsProfile from './EducatorsProfile';
import EducatorProfileUpdate from './EducatorsProileUpdate';

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
            <Route path="/adminProfile" exact={true} element={<AdminProfile />} />
            <Route path="/adminProfileUpdate" exact={true} element={<AdminProfileUpdate />} />
            <Route path="/nosotros" element={<AboutUs />} />
            <Route path="/historia" element={<History />} />
            <Route path="/mision-vision-valores" element={<MisionOverviewValues />} />
            <Route path="/asociacion" element={<Association />} />
            <Route path="/admin/:id" element={<AdminFamily />} />
            <Route path="/transparencia" exact={true} element={<Transparency />} />
            <Route path="/adminPerfil" exact={true} element={<AdminProfile />} />
            <Route path="/adminPerfilActualizar" exact={true} element={<AdminProfileUpdate />} />
            <Route path="/adminFamilias" exact={true} element={<AdminFamily />} />
            <Route path="/adminFamiliasSolicitudes" exact={true} element={<AdminFamilyRequests />} />
            <Route path="/entidades-colaboradoras" exact={true} element={<ColaboratorEntities />} />
            <Route path="/donde-estamos" exact={true} element={<WhereWeAre />} />
            <Route path="/adminEventos" exact={true} element={<AdminEventos />} />
            <Route path="/adminClases" exact={true} element={<AdminClases />} />
            <Route path="/adminProyectos" exact={true} element={<AdminProyectos />} />
            <Route path="/adminCrearProyecto" exact={true} element={<AdminCrearProyecto />} />
            <Route path="/proyectos" exact={true} element={<ProyectsQuarterlyEvaluation />} />
            <Route path="/proyectos/evaluaciónTrimestral" exact={true} element={<ProyectsQuarterlyEvaluation />} />
            <Route path="/proyectos/evaluaciónAnual" exact={true} element={<ProjectsYearlyEvaluation />} />
            
            {/* Educators */}
            <Route path="/EducadoresProfile" exact={true} element={<EducatorsProfile />} />
            <Route path="/EducadoresProfile/Actualizar" exact={true} element={<EducatorProfileUpdate />} />
            <Route path="/Educadores/niños/evaluacionDiaria" exact={true} element={<KidsDailyEvaluation />} />
            <Route path="/Educadores/niños/evaluacionAnual" exact={true} element={<KidsYearlyEvaluation />} />
            <Route path="/Educadores/niños/Actividades" exact={true} element={<EducatorsActivities />} />
            <Route path="/Educadores/proyectos/evaluacionAnual" exact={true} element={<ProjectsYearlyEvaluation />} />
            <Route path="/Educadores/proyectos/evaluacionAnual" exact={true} element={<ProjectsYearlyEvaluation />} />
            <Route path="/Educadores/proyectos/evaluacionTrimestral" exact={true} element={<ProyectsQuarterlyEvaluation />} />

         
            <Route path="/voluntarioAgenda" exact={true} element={<VolunteerAgenda />} />



            </Routes>
    </Router>
  );
}

export default App;
