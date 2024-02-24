import React from 'react';
import '../styles/styles.css'

const educadoresData = [{ id: 1, nombre: "Juan", edad: "35", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeYLAt1xGn7s3kcdZ7HwKFeu2gAfqBk8Y1DQ&usqp=CAU" },
{ id: 2, nombre: "María", edad: "27", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIKDHjOS7DtL_t35dplixSlxRm4QPWKUaYdA&usqp=CAU" },
{ id: 3, nombre: "Pedro", edad: "18", imagen: "https://quinpu.com/uploads/default/original/1X/351a23e1787a29ce86e1e23f05f15e7b452b7b4d.jpeg" }]

const Voluntarios = () => {
    return (
      <>
        <ul>
          {educadoresData.map(v => {
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

const AdminEducadores = () => {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
          <ul className='ul' style={{ margin: '10px 0' }}>
            <li className='li' style={{ marginRight: '10px' }}>
              <a href='http://localhost:3000/adminEducadores/añadir' style={{color:"black"}}>Añadir educador</a>
            </li>
          </ul>
        </div>
        <Voluntarios />

      </>

    );
  }

  export default AdminEducadores;