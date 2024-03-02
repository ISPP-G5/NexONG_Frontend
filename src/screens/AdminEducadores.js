import React from 'react';
import '../styles/styles.css'
import { Link } from 'react-router-dom';

const educadoresData = [{ id: 1, nombre: "Juan", edad: "35", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeYLAt1xGn7s3kcdZ7HwKFeu2gAfqBk8Y1DQ&usqp=CAU" },
{ id: 2, nombre: "María", edad: "27", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIKDHjOS7DtL_t35dplixSlxRm4QPWKUaYdA&usqp=CAU" },
{ id: 3, nombre: "Pedro", edad: "18", imagen: "https://quinpu.com/uploads/default/original/1X/351a23e1787a29ce86e1e23f05f15e7b452b7b4d.jpeg" }]

const Voluntarios = () => {
  return (
    <>
      <ul className='ul-Volunteer'>
      <a  href='http://localhost:3000/adminEducadores/añadir' style={{ display: "flex", justifyContent: "center" , color:'black', marginBottom:'0.5%'}}>Añadir educador</a>
        {educadoresData.map(v => {
          return (
            <li className='flex-container-Volunteer' key={v.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={v.imagen} alt={"imagen de" + v.nombre} style={{
                  maxWidth: '200px',
                  maxHeight: '200px',
                  objectFit: 'cover',
                }} />
                <div style={{ marginLeft: '5px' }}>
                  <h4>Nombre: {v.nombre}</h4>
                  <h4>Edad: {v.edad}</h4>
                </div>
              </div>

            </li>
          )
        }
        )
        }
      </ul>
    </>

  )

};

const AEducadores = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'flex-end', marginTop: '1%' }}>
        <img src={'https://lamenteesmaravillosa.com/wp-content/uploads/2018/09/hombre-creido-pensando-que-sabe.jpg'} alt={"imagen de admin "} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
        <Link to={'/'} style={{ marginRight: '2%', color: 'black', fontSize: '20px', marginBottom:'20px' }}>Admin</Link>
      </div>
      <Voluntarios />
    </>

  );
}

export default AEducadores;