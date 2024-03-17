import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import '../styles/styles.css';

// HOMEPAGE
import HomePage from './homepage/HomePage';
import HomePageAssociation from './homepage/HomePageAssociation';
import HomePageAboutUs from './homepage/HomePageAboutUs';
import HomePageHistory from './homepage/HomePageHistory';
import HomePageWhereWeAre from './homepage/HomePageWhereWeAre';
import HomePageMisionOverviewValues from './homepage/HomePageMisionOverviewValues';
import HomePageTransparency from './homepage/HomePageTransparency';
import HomePageColaboratorEntities from './homepage/HomePageColaboratorEntities';
import HomePageActivities from './homepage/HomePageActivities';
import HomePageCamps from './homepage/HomePageCamps';
import HomePageOpenRoom from './homepage/HomePageOpenRoom';
import HomePageCoexistenceRoom from './homepage/HomePageCoexistenceRoom';
import HomePageFamilyWorkshop from './homepage/HomePageFamilyWorkshops';
import HomePageSummerClub from './homepage/HomePageSummerClub';
import HomePageAgenda from './homepage/HomePageAgenda';
import HomePageDonation from './homepage/HomePageDonation';
import HomePageVolunteers from './homepage/HomePageVolunteers';
import HomePageSuggestions from './homepage/HomePageSuggestions';
import Register from './homepage/Register';
import LogIn from './homepage/LogIn';

// ADMIN
import AdminProfile from './admin/AdminProfile';
import AdminProfileUpdate from './admin/AdminProfileUpdate';
import AdminFamily from './admin/AdminFamily';
import AdminFamilyRequests from './admin/AdminFamilyRequests';
import AdminVolunteers from './admin/AdminVolunteers';
import AdminVolunteerssAdd from './admin/AdminVolunteersAdd';
import AdminEducators from './admin/AdminEducators';
import AdminEducatorsAdd from './admin/AdminEducatorsAdd';
import AdminAssembly from './admin/AdminAssembly';
import AdminEvents from './admin/AdminEvents';
import AdminLessons from './admin/AdminLessons';
import AdminLessonsCreate from './admin/AdminLessonsCreate';
import AdminLessonsEdit from './admin/AdminLessonsEdit';
import AdminProjects from './admin/AdminProjects';
import AdminProjectsCreate from './admin/AdminProjectsCreate';

// EDUCATORS
import EducatorsProfile from './educators/EducatorsProfile';
import EducatorsProfileUpdate from './educators/EducatorsProfileUpdate';
import EducatorsKidsEvaluationDaily from './educators/EducatorsKidsEvaluationDaily';
import EducatorsKidsEvaluationYearly from './educators/EducatorsKidsEvaluationYearly';
import EducatorsKidsActivities from './educators/EducatorsKidsActivities';
import EducatorsProjectsEvaluationYearly from './educators/EducatorsProyectsEvaluationYearly';
import EducatorsProjectsEvaluationQuarterly from './educators/EducatorsProyectsEvaluationQuarterly';

// VOLUNTEERS
import VolunteersProfile from './volunteers/VolunteersProfile';
import VolunteersProfileUpdate from './volunteers/VolunteersProfileUpdate';
import VolunteersAgenda from './volunteers/VolunteersAgenda';
import VolunteersForm from './volunteers/VolunteersForm';


function App() {
  return (
    <Router>
      <Routes>
            <Route path="/" element={<HomePage />} />

            {/* HOMEPAGE ROUTES */}
            <Route path="/asociacion" element={<HomePageAssociation />} />
            <Route path="/asociacion/nosotros" element={<HomePageAboutUs />} />
            <Route path="/asociacion/historia" element={<HomePageHistory />} />
            <Route path="/asociacion/donde-estamos" exact={true} element={<HomePageWhereWeAre />} />
            <Route path="/asociacion/mision-vision-valores" element={<HomePageMisionOverviewValues />} />
            {/* Falta la salle */}
            {/* Falta organizacion */}
            <Route path="/asociacion/transparencia" exact={true} element={<HomePageTransparency />} />
            <Route path="/asociacion/entidades-colaboradoras" exact={true} element={<HomePageColaboratorEntities />} />

            <Route path="/actividades" element={<HomePageActivities />} />
            <Route path="/actividades/campamentos" element={<HomePageCamps />} />
            <Route path="/actividades/aula-abierta" element={<HomePageOpenRoom />} />
            <Route path="/actividades/aula-convivencia" element={<HomePageCoexistenceRoom />} />
            <Route path="/actividades/talleres-familiares" element={<HomePageFamilyWorkshop />} />
            <Route path="/actividades/club-verano" element={<HomePageSummerClub />} />
                        
            <Route path="/agenda" element={<HomePageAgenda />} />
            <Route path="/donaciones" element={<HomePageDonation />} />
            <Route path="/voluntariado" element={<HomePageVolunteers />} />            
            <Route path="/form-voluntariado" element={<VolunteersForm />} />
            <Route path="/sugerencias" element={<HomePageSuggestions />} />
            
            <Route path="/registrarse" element={<Register />} />
            <Route path="/iniciar-sesion" element={<LogIn />} />
            
            {/* ADMIN ROUTES */}
            <Route path="/admin/perfil" exact={true} element={<AdminProfile />} />
            <Route path="/admin/perfil/actualizar" exact={true} element={<AdminProfileUpdate />} />

            <Route path="/admin/familias" exact={true} element={<AdminFamily />} />
            <Route path="/admin/familias/solicitudes" exact={true} element={<AdminFamilyRequests />} />

            <Route path="/admin/voluntarios" element={<AdminVolunteers />} />
            <Route path="/admin/voluntarios/agregar" exact={true} element={<AdminVolunteerssAdd />} />

            <Route path="/admin/educadores" element={<AdminEducators />} />
            <Route path="/admin/educadores/agregar" exact={true} element={<AdminEducatorsAdd />} />

            <Route path="/admin/asamblea" exact={true} element={<AdminAssembly />} />
            <Route path="/admin/eventos" exact={true} element={<AdminEvents />} />
            <Route path="/admin/clases" exact={true} element={<AdminLessons />} />
            <Route path="/admin/clases/crear" exact={true} element={<AdminLessonsCreate />} />
            <Route path="/admin/clases/editar/:lessonId" exact={true} element={<AdminLessonsEdit />} />
            <Route path="/admin/proyectos" exact={true} element={<AdminProjects />} />
            <Route path="/admin/proyectos/crear" exact={true} element={<AdminProjectsCreate />} />


            {/* EDUCATORS ROUTES */}
            <Route path="/educadores/perfil" exact={true} element={<EducatorsProfile />} />
            <Route path="/educadores/perfil/actualizar" exact={true} element={<EducatorsProfileUpdate />} />
            
            <Route path="/educadores" exact={true} element={<EducatorsKidsEvaluationDaily />} />
            <Route path="/educadores/niños" exact={true} element={<EducatorsKidsEvaluationDaily />} />
            <Route path="/educadores/niños/evaluacion/diaria" exact={true} element={<EducatorsKidsEvaluationDaily />} />
            <Route path="/educadores/niños/evaluacion/anual" exact={true} element={<EducatorsKidsEvaluationYearly />} />
            <Route path="/educadores/niños/actividades" exact={true} element={<EducatorsKidsActivities />} />

            <Route path="/educadores/proyectos" exact={true} element={<EducatorsProjectsEvaluationYearly />} />
            <Route path="/educadores/proyectos/evaluacion/anual" exact={true} element={<EducatorsProjectsEvaluationYearly />} />
            <Route path="/educadores/proyectos/evaluacion/trimestral" exact={true} element={<EducatorsProjectsEvaluationQuarterly />} />


            {/* VOLUNTEERS ROUTES */}
            <Route path="/voluntarios/perfil" exact={true} element={<VolunteersProfile />} />
            <Route path="/voluntarios/perfil/actualizar" exact={true} element={<VolunteersProfileUpdate />} />  
      
            <Route path="/voluntarios/agenda" exact={true} element={<VolunteersAgenda />} />


            </Routes>
    </Router>
  );
}

export default App;
