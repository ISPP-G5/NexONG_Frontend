// AdminView.js

import React from 'react';
import '../../styles/styles.css'
import { useState } from 'react';

const SociosData = [{ id: 1, nombre: "Juan", edad: "35", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeYLAt1xGn7s3kcdZ7HwKFeu2gAfqBk8Y1DQ&usqp=CAU" },
{ id: 2, nombre: "María", edad: "27", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIKDHjOS7DtL_t35dplixSlxRm4QPWKUaYdA&usqp=CAU" },
{ id: 3, nombre: "Pedro", edad: "18", imagen: "https://quinpu.com/uploads/default/original/1X/351a23e1787a29ce86e1e23f05f15e7b452b7b4d.jpeg" }]


const Socios = () => {
  return (
    <>
      <ul>
        {SociosData.map(v => {
          return (
            <li className='flex-container' key={v.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={v.imagen} alt={"imagen de" + v.nombre} style={{
                  maxWidth: '40%',
                  maxHeight: '40%',
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
const Asamblea = () => {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '2000px', alignItems: 'center' }}>
        <form onSubmit={"handleSubmit"}>

          <div className='field-text' style={{ marginBottom: '20px' }}>
            <h4>Titulo</h4>
            <input type='text' placeholder='Escriba aquí' style={{ width: '115%'}} ></input>
          </div>
          
          <div className='field-text' style={{ marginBottom: '20px' }}>
          <h4>Descripción</h4>
            <input type='text' placeholder='Escriba aquí' style={{ width: '115%',height: '150px', resize: 'vertical', textAlign:'initial'}} ></input>
          </div>
          
          <div className='field-text' style={{ marginBottom: '20px' }}>
            <h4>Fecha</h4>
            <input type='text' placeholder='dd/mm/yyyy' style={{ width: '115%'}} ></input>
          </div>
          
          <div style={{ marginLeft: '200px' }}>
            <button className='button' style={{width:'100px' }}>crear</button>
          </div>
        </form>
      </div>
    </>

  )

};
const AdminSocios = () => {
  const [CambiaVista, SetCambiaVista] = useState(false)
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ul className='ul' style={{ margin: '10px 0' }}>
          <li className='li' style={{ marginRight: '10px' }}>
            <a onClick={() => SetCambiaVista(false)} >Convocar Asamblea</a>
          </li>
          <li className='li' style={{ marginLeft: '10px' }}>
            <a onClick={() => SetCambiaVista(true)} >Nuestros Socios</a>
          </li>
        </ul>
      </div>
      {CambiaVista === true ? < Socios /> : <Asamblea />}

    </>

  );
}

export default AdminSocios;