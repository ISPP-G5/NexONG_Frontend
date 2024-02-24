import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/styles.css'

const adData = [{id: 1, nombre: "Simiente", email: "simtofe@manosabiertas.com", password: "cimientos", telefono: 609123324, direccion: "C. Manzana 11, 41009, Sevilla", imagen: "https://covalto-production-website.s3.amazonaws.com/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp" }]

const AdminProfiles = () => {
    return (
      <>
        <ul>
          {adData.map(v => {
            return (
                <div style={{ border: ' 5px outset grey', width: '50%', borderRadius: '20%', height: '85%', marginLeft: '30%'}}>
                <div style={{textAlign:'center', margin:'5%'}}> 
                  <img src={v.imagen} alt={"imagen de" + v.nombre} style={{ 
                      maxWidth: '60%', 
                      maxHeight: '60%', 
                      borderRadius: '100%',
                    }}  />
                </div>
                <div style={{textAlign:'center'}}>
                    <div className='field-text' style={{ textAlign: 'center', fontWeight: 'bold'}}
                        >{v.nombre}</div>
                </div>
                    <div className='field-text'
                    style={{ fontWeight: 'bold', marginLeft: '10%'}}
                    >Email</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>{v.email}</div>

                    <div className='field-text'
                    style={{ fontWeight: 'bold', marginLeft: '10%'}}
                    >Teléfono</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>{v.telefono}</div>

                    <div className='field-text'
                    style={{ fontWeight: 'bold', marginLeft: '10%'}}
                    >Contraseña</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>{v.password}</div>

                    <div className='field-text'
                    style={{ fontWeight: 'bold', marginLeft: '10%'}}
                    >Dirección</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>{v.direccion}</div>

                    <div style={{textAlign:'center'}}>
                    <button className='button'
                        style={{ backgroundColor: 'aed6f1', maxHeight: '60%', margin:'4%'}}>
                          <Link to={`/AdminProfileUpdate`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                  backgroundColor: "aed6f1",
                                }}>
                            Actualizar perfil
                          </Link>
                    </button></div>
                </div>
              )
          }
          )
          }
        </ul>
      </>
  
    )
  
  };
  
  export default AdminProfiles;