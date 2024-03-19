import '../../styles/styles.css';
import { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

function HomePageTransparency() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <LayoutHomepage 
            title="Transparencia"
            description="La Asociación Manos Abiertas con Norte apuesta por la transparencia como uno de los objetivos prioritarios de intervención. Por ello, si quieres saber más sobre nosotros, podrás encontrar documentación institucional en las que aparece todo aquello que hemos realizado durante estos últimos años. Esperemos sirvan para acercarte más aún a nuestra asociación y a la realidad en la que estamos inmersos."
            image={'ong'}
        >  
            <table className='trans'>
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
                <tr>
                    <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Estatutos-Asoxiación.pdf" rel="noreferrer">Estatutos Asociación</a></td>
                    <td><a href='http://manosabiertasnorte.es/files/memoria-anual-mmaa-2014.pdf' target="_blank" download="Memoria-Anual-2014.pdf" rel="noreferrer">Memoria anual 2014</a></td>
                    <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Memoria-económica-2014.pdf" rel="noreferrer">Memoria económica 2014</a></td>
                    <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Balance-cuentas-2014.pdf" rel="noreferrer">Balance cuentas 2014</a></td>
                    <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Código-etico-conducta.pdf" rel="noreferrer">Código ético y de conducta</a></td>
                </tr>
                <tr>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Acta funcional</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Memoria anual 2015</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Memoria económica 2015</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Balance cuentas 2015</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Código ético de voluntariado</a></td>
                </tr>
                <tr>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Inscripción Registro de Asociaciones</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Memoria anual 2016</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Memoria económica 2016</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Balance cuentas 2016</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Calidad, buen gobierno y buenas prácticas</a></td>
                </tr>
                <tr>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Registro General de Entidades de Voluntariado</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Memoria anual 2017</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Memoria económica 2017</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Balance cuentas 2017</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Memoria igualdad de género</a></td>
                </tr>
                <tr>
                <td></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Memoria anual 2018</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Memoria económica 2018</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Balance cuentas 2018</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" rel="noreferrer">Dossier de prensa 2022</a></td>
                </tr>
                <tr>
                <td></td>
                <td><a href='/' target="_blank" rel="noreferrer">Memoria anual 2019</a></td>
                <td><a href='/' target="_blank" rel="noreferrer">Memoria económica 2019</a></td>
                <td><a href='/' target="_blank" rel="noreferrer">Balance cuentas 2019</a></td>
                <td></td>
                </tr>
                <tr>
                <td></td>
                <td><a href='/' target="_blank">Memoria anual 2020</a></td>
                <td><a href='/' target="_blank">Memoria económica 2020</a></td>
                <td><a href='/' target="_blank">Balance cuentas 2020</a></td>
                <td></td>
                </tr>
                <tr>
                <td></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Estatutos-Asoxiación.pdf" rel="noreferrer">Memoria anual 2021</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Estatutos-Asoxiación.pdf" rel="noreferrer">Memoria económica 2021</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Estatutos-Asoxiación.pdf" rel="noreferrer">Balance cuentas 2021</a></td>
                <td></td>
                </tr>
                <tr>
                <td></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Estatutos-Asoxiación.pdf" rel="noreferrer">Memoria anual 2022</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Estatutos-Asoxiación.pdf" rel="noreferrer">Memoria económica 2022</a></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Estatutos-Asoxiación.pdf" rel="noreferrer">Balance cuentas 2022</a></td>
                <td></td>
                </tr>
                <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><a href='http://manosabiertasnorte.es/files/Estatutos-2019--2-.pdf' target="_blank" download="Estatutos-Asoxiación.pdf" rel="noreferrer">Pérdidas y Ganancias 2022</a></td>
                <td></td>
                </tr>
                </tbody>
            </table>
        </LayoutHomepage>
    )    
}

export default HomePageTransparency;