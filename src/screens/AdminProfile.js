import React from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css'

const adData = [{id: 1, nombre: "Simiente", email: "simtofe@manosabiertas.com", password: "cimientos", telefono: "609123324", direccion: "C. Manzana 11, 41009, Sevilla", imagen: "https://covalto-production-website.s3.amazonaws.com/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp" }]

const AdminProfiles = () => {
    return (
      <>
        <ul>
          {adData.map(v => {
            return (
              <div>
                <div style={{textAlign:'right', margin:'5%'}}> 
                <img src={v.imagen} alt={"imagen de" + v.nombre} style={{ 
                  maxWidth: '5%', 
                  maxHeight: '5%', 
                  borderRadius: '100%',
                }}  />
                <div className='field-text' style={{ float: 'right', margin: '1.4%'}}
                    ><Link to={'/AdminProfile'}>{v.nombre}</Link></div>
                </div>
                
                <div className='admin-container'>
                <div style={{textAlign:'center', margin:'5%'}}> 
                  <img src={v.imagen} alt={"imagen de" + v.nombre} style={{ 
                      maxWidth: '60%', 
                      maxHeight: '60%', 
                      borderRadius: '100%',
                    }}  />
                </div>
                    
                    <div style={{ alignSelf: 'center', fontWeight: 'bold'}}
                        >{v.nombre}</div>

                    <div className='sub-header'>Email</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>{v.email}</div>

                    <div className='sub-header'>Teléfono</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>{v.telefono}</div>

                    <div className='sub-header'>Contraseña</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>{v.password}</div>
                    
                    <div className='sub-header'>Dirección</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>{v.direccion}</div>

                    <button className='button' style={{textAlign:'center', alignSelf:'center', margin:'4%'}}>
                          <Link to={`/AdminProfileUpdate`}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                  backgroundColor: "aed6f1",
                                }}>
                            Actualizar perfil
                          </Link>
                    </button>
                    </div>
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