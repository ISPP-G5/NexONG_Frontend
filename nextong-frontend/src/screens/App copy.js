import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import '../styles/styles.css';
import AdminVoluntario from "./admin/AdminVoluntarios"
import AdminEducadores from './admin/AdminEducadores';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/adminVoluntarios" exact={true} element={<AdminVoluntario/>} />
        <Route path="/adminEducadores" exact={true} element={<AdminEducadores/>} />
    </Routes>
    </Router>
  );
}

export default App;
