import '../../styles/styles.css';
import React, { useEffect } from 'react';
import LayoutHomepage from '../../components/LayoutHomepage';

const info = [
    {
        title: 'Misión',
        description: (
            <div>
                <p>
                    Nuestra identidad está marcada por la educación no formal que consideramos fundamental en nuestra
                    zona de actuación y la implantamos de manera dinámica y abierta con el fin de adaptarnos a las nuevas
                    necesidades que nuestros beneficiarios presentan y que descubrimos a través de los estudios de la zona
                    y la observación directa.
                </p>
            </div>
        ),
    },
    {
        title: 'Visión',
        description: (
            <div>
                <p>
                    Consolidarnos en la zona norte de Sevilla en cuanto a intervención socioeducativa, así como ser un
                    punto de información abierto a toda la comunidad, que consiga ofrecer y/o dotar de recursos a la población
                    de esta zona de Sevilla, contribuyendo a la disminución de la desigualdad social, alcanzando una
                    intervención holística y ecológica sobre los beneficiarios de los programas ejecutados.
                </p>
                <p>
                    Además de esto queremos llegar a ser reconocidos por la cercanía y la capacidad de adaptación a las
                    necesidades sociales ampliando nuestros programas.
                </p>
            </div>
        ),
    },
    {
        title: 'Valores',
        description: (
            <div>
                <p>
                    A nivel de trabajo o de actuación y en el intento de conseguir metas fijadas, planes propuestos y
                    actovodades programadas, desarrollamos una intervención educativa y emocional.
                </p>
                <p>
                    Educar desde lo conocido, desde aquello que sabemos y sentimos para ofrecerlo en tiempo a los demás
                    a través de herramientas educativas: excursiones, juegos, gymkanas, acampadas... hace posible que
                    podamos trabajar inclucando valores y que podamos darlos a conocer a el/la menor o adolescente de
                    manera transversal.
                </p>
                <p>
                    Las actividades que realiza Manos Abiertas están enmarcadas, sobre todo, en el desarrollo de
                    habilidades sociales y en fomentar el crecimiento pleno de las niñas y los niños, a través de los
                    siguientes VALORES:
                </p>
            </div>

        ),
        list: [
        <div>
            <i>Respeto</i>
            <span>
                : de todos/as y para todos/as teniendo una escucha activa y paciente con el usuario.
            </span>
        </div>,
        <div>
            <i>Responsabilidad</i>
            <span>
                : ser consecuentes con nuestra acción y ofrecer la relación de ayuda en todos los casos.
            </span>
        </div>,
        <div>
            <i>Compromiso y Solidaridad</i>
            <span>
                : desde la observación social, la detección de necesidades y la proposición de respuestas ajustadas,
                efectivas y continuas. Para seguir prestando un servicio útil a la sociedad ajustando nuestra acción
                a las necesidades cambiantes.
            </span>
        </div>,
        <div>
            <i>Libertad e Igualdad</i>
            <span>
                : todo el equipo responsable de la organización, así como los voluntarios y beneficiarios de los
                programas ejercerán su participación de manera libre y procurando la igualdad a través de un sistema
                de relación horizontal.
            </span>
        </div>,
        <div>
            <i>Democracia y Participación</i>
            <span>
                : las decisiones se tomarán por consenso y se fomentará la participación.
            </span>
        </div>,
        <div>
            <i>Accesibilidad</i>
            <span>
                : la Asociación debe ser fácilmente accesible para cualquier ciudadano, y sus actuaciones, gestión,
                etc. transparentes.
            </span>
        </div>,
        <div>
            <i>Cooperación y Colaboración</i>
            <span>
                : la entidad debe mantener relaciones con asociaciones similares, entidades u organizaciones, públicas
                o privadas, etc. Igualmente, la Asociación debe fomentar la cooperación y colaboración entre sus
                Asociados/as.
            </span>
        </div>,
        <div>
            <i>Creatividad e Innovación</i>
            <span>
                : la entidad debe ser proactiva e innovadora en sus actuaciones.
            </span>
        </div>]
    },
  ];

function HomePageMisionOverviewValues() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    return (
        <LayoutHomepage
            title="MISIÓN, VISIÓN Y VALORES"
            image={'ong'}
            info={info}
          />
    );
}

export default HomePageMisionOverviewValues;
