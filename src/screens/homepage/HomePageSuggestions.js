import '../../styles/styles.css';
import { useEffect } from 'react';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import Footer from '../../components/Footer';

function HomePageSuggestions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
export default HomePageSuggestions;