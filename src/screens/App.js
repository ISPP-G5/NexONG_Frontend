
import Donation from './Donation';
import Suggestions from './Suggestions';
import  Register from './Register';
import LogIn from './LogIn';
import Camps from './camps';
import CoexistanceRoom from './CoexistanceRoom';
import FamilyWorkshop from './FamilyWorkshops';
import OpenRoom from './openRoom';
import SummerClub from './summerClub';

import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import '../styles/styles.css';
import AdminProfileUpdate from './AdminProfileUpdate';
import AdminProfile from './AdminProfile';
import HomePage from './HomePage';
import VolunteerForm from './VolunteerForm';

function App() {
  return (
    <Router>
      <Routes>
     
            <Route path="/" element={<HomePage />} />
            <Route path="/donaciones" element={<Donation />} />
            <Route path="/sugerencias" element={<Suggestions />} />
            <Route path="/registrarse" element={<Register />} />
            <Route path="/iniciar-sesion" element={<LogIn />} />
            <Route path="/aula-abierta" element={<OpenRoom />} />
            <Route path="/campamentos" element={<Camps />} />
            <Route path="/form-voluntario" element={<VolunteerForm />} />
            <Route path="/aula-convivencia" element={<CoexistanceRoom />} />
            <Route path="/talleres-familiares" element={<FamilyWorkshop />} />
            <Route path="/club-verano" element={<SummerClub />} />
            <Route path="/adminProfile" exact={true} element={<AdminProfile />} />
            <Route path="/adminProfileUpdate" exact={true} element={<AdminProfileUpdate />} />

            </Routes>
    </Router>
  );
}
export default App;