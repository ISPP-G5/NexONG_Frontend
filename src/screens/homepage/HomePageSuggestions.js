import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

function HomePageSuggestions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LayoutHomepage 
      title="Sugerencias"
      image={'ong'}
    />  
  );
}
export default HomePageSuggestions;