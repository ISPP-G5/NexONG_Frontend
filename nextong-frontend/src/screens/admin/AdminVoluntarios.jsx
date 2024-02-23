// AdminView.js

import React from 'react';
import '../../styles/styles.css'
import { useState } from 'react';
import { Key } from '@mui/icons-material';

const voluntariosData = [{ id: 1, nombre: "Juan", edad: "35", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeYLAt1xGn7s3kcdZ7HwKFeu2gAfqBk8Y1DQ&usqp=CAU" },
{ id: 2, nombre: "María", edad: "27", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIKDHjOS7DtL_t35dplixSlxRm4QPWKUaYdA&usqp=CAU" },
{ id: 3, nombre: "Pedro", edad: "18", imagen: "https://quinpu.com/uploads/default/original/1X/351a23e1787a29ce86e1e23f05f15e7b452b7b4d.jpeg" }]

const solicitudesData = [{ id: 1, nombre: "Pepe", informacion: "Trabajador social", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBiw5_D_gzI22l-ghYOXpA0JIvDJSclPbF-g&usqp=CAU" },
{ id: 2, nombre: "Marta", informacion: "Estudiante de medicina", imagen: "https://img.freepik.com/foto-gratis/retrato-joven-rubio-mujer_273609-12060.jpg" },
{ id: 3, nombre: "Juan", informacion: "Camarero a tiempo parcial", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_0_FtzSpkAvbWc_hx6Is_gIsgzM8l-QDJJ5Ohx09-19EYlXXzNYE82UrWw5EbfRENro&usqp=CAU" }]

const Voluntarios = () => {
  return (
    <>
      <ul>
        {voluntariosData.map(v => {
          return (
            <li className='flex-container' key={v.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={v.imagen} alt={"imagen de" + v.nombre} style={{ 
                    maxWidth: '40%', 
                    maxHeight: '40%', 
                    objectFit: 'cover',
                  }}  />
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
const Solicitudes = () => {
  return (
    <>
      <ul>
        {solicitudesData.map(v => {
          return (
            <li className='flex-container' style={{ marginBottom: '10px' }} key={v.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={v.imagen} alt={"imagen de" + v.nombre} style={{ 
                    maxWidth: '40%', 
                    maxHeight: '40%', 
                    objectFit: 'cover',
                  }}/>
                <div style={{ marginLeft: '5px' }}>
                  <h4>Nombre: {v.nombre}</h4>
                  <h4>Información: {v.informacion}</h4>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <button className='button' style={{backgroundColor:'transparent' ,width:'120%'}}>Descargar Archivos</button>
                  <button className='button' style={{ backgroundColor: 'lightgreen',width:'120%' }}>Aceptar</button>
                  <button className='button' style={{ backgroundColor: 'red', width:'120%' }}> Denegar</button>
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
const AdminVoluntarios = () => {
  const [CambiaVista, SetCambiaVista] = useState(false)
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ul className='ul' style={{ margin: '10px 0' }}>
          <li className='li' style={{ marginRight: '10px' }}>
            <a onClick={() => SetCambiaVista(false)} >Nuestros Voluntarios</a>
          </li>
          <li className='li' style={{ marginLeft: '10px' }}>
            <a onClick={() => SetCambiaVista(true)} >Solicitudes</a>
          </li>
        </ul>
      </div>
      {CambiaVista === true ? <Solicitudes /> : <Voluntarios />}

    </>

  );
}

export default AdminVoluntarios;