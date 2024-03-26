// History.js
import '../../styles/styles.css';
import { useEffect } from 'react';
import chronology from '../../logo/actividades-desarrolladas.jpg';
import LayoutHomepage from '../../components/LayoutHomepage';
import HistoryDescription from '../../components/HistoryDescription';
function HomePageHistory() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      

    
      
    return (
        <LayoutHomepage 
            title="HISTORIA" 
            description={<HistoryDescription />} // Use the DescriptionComponent here
            
            image={'activities'}
        > 
            <p>Las actividades han variado a lo largo de estos años según se muestra en el siguiente cuadro:</p>
            <img src={chronology} alt="Cronología de la Asociación Manos Abiertas con Norte" />
            
        </LayoutHomepage>
    );
}

export default HomePageHistory;