import '../../styles/styles.css';
import { useEffect, useMemo } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';
import {UseFetchDocuments} from '../../components/useFetchData';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;



function HomePageTransparency() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const documents = UseFetchDocuments(API_ENDPOINT);

    const documentsByType = useMemo(() => {
        const groups = {
          DOCS_INSTITUCIONALES: [],
          MEMORIAS_ANUALES: [],
          MEMORIAS_ECONOMICAS: [],
          BALANCE_CUENTAS: [],
          OTROS_DOCS: [],
        };
    
        for (const document of documents) {
          groups[document.docType].push(document);
        }
    
        return groups;
      }, [documents]);
    
    const maxRows = useMemo(() => {
    return Math.max(...Object.values(documentsByType).map(docs => docs.length));
    }, [documentsByType]);

    return (
        <LayoutHomepage 
            title="Transparencia"
            description="La Asociación Manos Abiertas con Norte apuesta por la transparencia como uno de los objetivos prioritarios de intervención. Por ello, si quieres saber más sobre nosotros, podrás encontrar documentación institucional en las que aparece todo aquello que hemos realizado durante estos últimos años. Esperemos sirvan para acercarte más aún a nuestra asociación y a la realidad en la que estamos inmersos."
            image={'ong'}
        >   
        <table className='trans' id='newRow'>
        <thead>
          <tr>
            <th>Documentos Institucionales</th>
            <th>Memorias Anuales</th>
            <th>Memoria Económica</th>
            <th>Balance de Cuentas</th>
            <th>Otros Documentos</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxRows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(documentsByType).map((docTypeDocuments, columnIndex) => (
                <td key={columnIndex}>
                  {docTypeDocuments[rowIndex] && (
                    <a href={docTypeDocuments[rowIndex].document}>
                      {docTypeDocuments[rowIndex].title}
                    </a>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
        </LayoutHomepage>
    )    
}



export default HomePageTransparency;