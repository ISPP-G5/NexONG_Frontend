import React from 'react';
import '../styles/styles.css'

const adData = [{id: 1, nombre: "Simiente", email: "simtofe@manosabiertas.com", password: "cimientos", telefono: 609123324, direccion: "C. Manzana 11, 41009, Sevilla", imagen: "https://covalto-production-website.s3.amazonaws.com/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp" }]

const AdminProfilesUpdate = () => {
    return (
      <>
        <ul>
          {adData.map(v => {
            return (
                <div style={{ border: ' 5px outset grey', width: '50%', borderRadius: '20%', height: '85%', marginLeft: '25%'}}>
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
                        <input type='text' placeholder='Email' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}></input>

                    <div className='field-text'
                    style={{ fontWeight: 'bold', marginLeft: '10%'}}
                    >Teléfono</div>
                        <input type='text' placeholder='Número de teléfono' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}></input>

                    <div className='field-text'
                    style={{ fontWeight: 'bold', marginLeft: '10%'}}
                    >Contraseña</div>
                        <input type='text' placeholder='Contraseña' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}></input>
                    
                    <div className='field-text'
                    style={{ fontWeight: 'bold', marginLeft: '10%'}}
                    >Repetir contraseña</div>
                        <input type='text' placeholder='Contraseña' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}></input>

                    <div className='field-text'
                    style={{ fontWeight: 'bold', marginLeft: '10%'}}
                    >Dirección</div>
                        <input type='text' placeholder='Dirección' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}></input>
                    <div style={{textAlign:'center'}}>
                    <button className='button'
                        style={{ backgroundColor: 'aed6f1', maxHeight: '60%', margin:'4%'}}>
                            Actualizar perfil
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
  
  export default AdminProfilesUpdate;