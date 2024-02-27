import React from 'react';
import '../styles/styles.css'

const adData = [{id: 1, nombre: "Simiente", email: "simtofe@manosabiertas.com", password: "cimientos", telefono: "609123324", direccion: "C. Manzana 11, 41009, Sevilla", imagen: "https://covalto-production-website.s3.amazonaws.com/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp" }]

const AdminProfilesUpdate = () => {
    return (
      <>
        <ul>
          {adData.map(v => {
            return (
                <div className='update-container'>
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
                        <input type='text' placeholder='Email'></input>

                    <div className='sub-header'>Teléfono</div>
                        <input type='text' placeholder='Número de teléfono'></input>

                    <div className='sub-header'>Contraseña</div>
                        <input type='text' placeholder='Contraseña'></input>
                    
                    <div className='sub-header'>Repetir contraseña</div>
                        <input type='text' placeholder='Contraseña'></input>

                    <div className='sub-header'>Dirección</div>
                        <input type='text' placeholder='Dirección'></input>
                    
                    <button className='button' style={{textAlign:'center', alignSelf:'center', margin:'4%'}}>
                            Actualizar perfil
                    </button>
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