import '../styles/styles.css';
import Header from '../components/Header';
import Intro from '../components/Intro';
import Footer from '../components/Footer';

function Suggestions() {
  return (
    <div className="App">
        <Header/>
        <Intro 
            title="Sugerencias"
            image={'ong'}
        />
        <Footer/>
    </div>
  );
}
export default Suggestions;