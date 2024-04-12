import { BrowserRouter as Router, Route , Routes,useNavigate} from 'react-router-dom';
import '../styles/styles.css';
import { useEffect, useState } from 'react';
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
import HomePageLaSalle from './homepage/HomePageLaSalle';
// ADMIN
import AdminProfile from './admin/AdminProfile';
import AdminProfileUpdate from './admin/AdminProfileUpdate';
import AdminFamily from './admin/AdminFamily';
import AdminFamilyRequests from './admin/AdminFamilyRequests';
import AdminVolunteers from './admin/AdminVolunteers';
import AdminVolunteersRequests from './admin/AdminVolunteersRequests';
import AdminEducators from './admin/AdminEducators';
import AdminEducatorsAdd from './admin/AdminEducatorsAdd';
import AdminPartners from './admin/AdminPartners';
import AdminPartnersAssembly from './admin/AdminPartnersAssembly';
import AdminEvents from './admin/AdminEvents';
import AdminLessons from './admin/AdminLessons';
import AdminLessonsCreate from './admin/AdminLessonsCreate';
import AdminLessonsEdit from './admin/AdminLessonsEdit';
import AdminSuggestions from './admin/AdminSuggestions';
import AdminTransparency from './admin/AdminTransparency';
import AdminEditProfiles from '../components/AdminEditProfiles';


// EDUCATORS
import EducatorProfile from './educators/EducatorProfile';
import EducatorProfileUpdate from './educators/EducatorProfileUpdate';
import EducatorKidsEvaluationDaily from './educators/EducatorKidsEvaluationDaily';
import EducatorKidsEvaluationYearly from './educators/EducatorKidsEvaluationYearly';
import EducatorKidsActivities from './educators/EducatorKidsActivities';

// VOLUNTEERS
import VolunteerProfile from './volunteers/VolunteerProfile';
import VolunteerProfileUpdate from './volunteers/VolunteerProfileUpdate';
import VolunteerAgenda from './volunteers/VolunteerAgenda';
import VolunteersAttendance from './volunteers/VolunteersAttendance';
import VolunteerForm from './volunteers/VolunteerForm';
import VolunteerWait from './volunteers/VolunteerWait';
import VolunteerFormation from './volunteers/VolunteerFormation';

// PARTNERS
//import PartnerProfile from './partners/PartnerProfile';
import PartnersCalendar from './partners/PartnersCalendar';

// FAMILIES
import FamilyProfile from './family/FamilyProfile';
import FamilyAuths from './family/FamilyAuths';
import FamilyAuthsPending from './family/FamilyAuthsPending';
import FamilyEval from './family/FamilyEval';

function RedirectToHome() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
}
function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));
  
  
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
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
            <Route path="/asociacion/la-salle" element={<HomePageLaSalle />} />

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
            <Route path="/sugerencias" element={<HomePageSuggestions />} />
            
            <Route path="/registrarse" element={<Register />} />
            <Route path="/iniciar-sesion" element={<LogIn />} />
            
            {/* ADMIN ROUTES */}
            {role === 'ADMIN' && (
              <>
            <Route path="/admin/perfil" exact={true} element={<AdminProfile />} />
            <Route path="/admin/perfil/actualizar" exact={true} element={<AdminProfileUpdate />} />
            <Route path="/admin/perfil/actualizar/:id" exact={true} element={<AdminEditProfiles />} />


            
            <Route path="/admin/voluntarios" element={<AdminVolunteers />} />
            <Route path="/admin/voluntarios/solicitudes" exact={true} element={<AdminVolunteersRequests />} />

            <Route path="/admin/educadores" element={<AdminEducators />} />
            <Route path="/admin/educadores/agregar" exact={true} element={<AdminEducatorsAdd />} />

            <Route path="/admin/socios" exact={true} element={<AdminPartners />} />
            <Route path="/admin/socios/asamblea" exact={true} element={<AdminPartnersAssembly />} />

            <Route path="/admin/familias" exact={true} element={<AdminFamily />} />
            <Route path="/admin/familias/solicitudes" exact={true} element={<AdminFamilyRequests />} />

            <Route path="/admin/sugerencias" exact={true} element={<AdminSuggestions />} />

            <Route path="/admin/documentos" exact={true} element={<AdminTransparency />} />
            
            {/* Routes para colegios aquí */}

            <Route path="/admin/clases" exact={true} element={<AdminLessons />} />
            <Route path="/admin/clases/crear" exact={true} element={<AdminLessonsCreate />} />
            <Route path="/admin/clases/editar/:lessonId" exact={true} element={<AdminLessonsEdit />} />

            <Route path="/admin/eventos" exact={true} element={<AdminEvents />} />
            </>
            )}

            {/* EDUCATORS ROUTES */}
            {role === 'EDUCADOR' && (
              <>
            <Route path="/educador/perfil" exact={true} element={<EducatorProfile />} />
            <Route path="/educador/perfil/actualizar" exact={true} element={<EducatorProfileUpdate />} />
            
            <Route path="/educador" exact={true} element={<EducatorKidsEvaluationDaily />} />
            <Route path="/educador/niños" exact={true} element={<EducatorKidsEvaluationDaily />} />
            <Route path="/educador/niños/evaluacion/diaria" exact={true} element={<EducatorKidsEvaluationDaily />} />
            <Route path="/educador/niños/evaluacion/anual" exact={true} element={<EducatorKidsEvaluationYearly />} />
            <Route path="/educador/niños/actividades" exact={true} element={<EducatorKidsActivities />} />
              </>
            )}
            
            {/* VOLUNTEERS ROUTES */}
            {role === 'VOLUNTARIO' && (
              <>
            <Route path="/voluntario/perfil" exact={true} element={<VolunteerProfile />} />
            <Route path="/voluntario/perfil/actualizar" exact={true} element={<VolunteerProfileUpdate />} />            
            <Route path="/voluntario/formulario" element={<VolunteerForm />} />
            <Route path="/voluntario/formacion" element={<VolunteerFormation />} />
            <Route path="/voluntario/espera" element={<VolunteerWait />} />
            <Route path="/voluntario/agenda" exact={true} element={<VolunteerAgenda />} />
            <Route path="/voluntario/asistencia" exact={true} element={<VolunteersAttendance />} />
              </>
            )}
            {/* PARTNERS ROUTES */}
            {role === 'SOCIO' && (
              <>
            {/*<Route path="/socio/perfil" exact={true} element={<PartnerProfile />} />*/}
            <Route path="/socio/calendario" exact={true} element={<PartnersCalendar />} />
              </>
            )}
            {/* FAMILIES ROUTES */}
            {role === 'FAMILIA' && (
              <>
            <Route path="/familia/perfil" exact={true} element={<FamilyProfile />} />
            <Route path="/familia/autorizaciones" exact={true} element={<FamilyAuths />} />
            <Route path="/familia/autorizaciones/pendientes" exact={true} element={<FamilyAuthsPending />} />
            <Route path="/familia/evaluacion/:tipoTiempo/:studentIndex" exact={true} element={<FamilyEval />} />
             </> 
            )}
             {/* Redirect unauthorized users to the homepage */}
          {!['ADMIN', 'EDUCADOR', 'SOCIO', 'VOLUNTARIO','FAMILIA'].includes(role) || (
            <Route path="*" element={<RedirectToHome />} />
      )}           



            </Routes>
    </Router>
  );
}

export default App;
