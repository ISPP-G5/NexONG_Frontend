import React, { useState } from 'react';
import '../styles/styles.css';
import { Link } from 'react-router-dom';

const voluntariosData = [
  { id: 1, nombre: "Juan", edad: "35", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeYLAt1xGn7s3kcdZ7HwKFeu2gAfqBk8Y1DQ&usqp=CAU" },
  { id: 2, nombre: "María", edad: "27", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIKDHjOS7DtL_t35dplixSlxRm4QPWKUaYdA&usqp=CAU" },
  { id: 3, nombre: "Sofía", edad: "18", imagen: "https://quinpu.com/uploads/default/original/1X/351a23e1787a29ce86e1e23f05f15e7b452b7b4d.jpeg" }
];

const solicitudesData = [
  { id: 1, nombre: "Pepe", informacion: "Trabajador social", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBiw5_D_gzI22l-ghYOXpA0JIvDJSclPbF-g&usqp=CAU" },
  { id: 2, nombre: "Marta", informacion: "Estudiante de medicina", imagen: "https://img.freepik.com/foto-gratis/retrato-joven-rubio-mujer_273609-12060.jpg" },
  { id: 3, nombre: "Juan", informacion: "Camarero a tiempo parcial", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_0_FtzSpkAvbWc_hx6Is_gIsgzM8l-QDJJ5Ohx09-19EYlXXzNYE82UrWw5EbfRENro&usqp=CAU" }
];

const RenderList = ({ data, isVolunteers }) => (
  <ul className='ul-Volunteer'>
    {data.map(v => (
      <li className='flex-container-Volunteer' key={v.id} style={{ marginBottom: '10px' }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={v.imagen}
            alt={"imagen de " + v.nombre}
            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
          />
          <div style={{ marginLeft: '5px' }}>
            <h4>Nombre: {v.nombre}</h4>
            {isVolunteers && <h4>Edad: {v.edad}</h4>}
            {!isVolunteers && <h4>Información: {v.informacion}</h4>}
          </div>
          {!isVolunteers && (
            <div style={{ marginLeft: '0%' }}>
              <button className='button' style={{ backgroundColor: 'transparent', width: '100%' }}>Descargar Archivos</button>
              <button className='button' style={{ backgroundColor: 'lightgreen', width: '100%' }}>Aceptar</button>
              <button className='button' style={{ backgroundColor: 'red', width: '100%' }}>Denegar</button>
            </div>
          )}
        </div>
      </li>
    ))}
  </ul>
);

const AVoluntarios = () => {
  const [cambiaVista, setCambiaVista] = useState(false);

  return (
    <main>
      <div style={{display:'flex',flexDirection:'row', alignItems:'end',justifyContent:'flex-end', marginTop:'1%'}}>
      <img src={'https://lamenteesmaravillosa.com/wp-content/uploads/2018/09/hombre-creido-pensando-que-sabe.jpg'} alt={"imagen de admin "} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius:'50%'}}/>
        <Link to={'/'} style={{marginRight:'2%',color:'black',fontSize:'20px',marginBottom:'20px'}}>Admin</Link> 
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ul className='ul' style={{ margin: '10px 0' }}>
          <li style={{ marginRight: '10px' }}>
            <a onClick={() => setCambiaVista(false)}>Nuestros Voluntarios</a>
          </li>
          <li style={{ marginLeft: '10px' }}>
            <a onClick={() => setCambiaVista(true)}>Solicitudes</a>
          </li>
        </ul>
      </div>
      {cambiaVista ? <RenderList data={solicitudesData} isVolunteers={false} /> : <RenderList data={voluntariosData} isVolunteers={true} />}
    </main>
  );
};

export default AVoluntarios;