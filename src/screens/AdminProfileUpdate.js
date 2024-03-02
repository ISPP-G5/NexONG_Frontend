import React from 'react';
import '../styles/styles.css';
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';

const adData = [{id: 1, nombre: "Simiente", email: "simtofe@manosabiertas.com", password: "cimientos", telefono: "609123324", direccion: "C. Manzana 11, 41009, Sevilla", imagen: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg" }]

const AdminProfilesUpdate = () => {
    return (
      <>
        <ul>
          {adData.map(v => {
            return (
              <div className='App'>
                <HeaderAdmin />
              <div className='admin-main'><MenuAdmin selected='Familias' /> 
              <div className='vertical-line'></div>  

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
                        
                    <div className='bold-text'>Email</div>
                        <input type='text' placeholder='Email'></input>

                    <div className='bold-text'>Teléfono</div>
                        <input type='text' placeholder='Número de teléfono'></input>

                    <div className='bold-text'>Contraseña</div>
                        <input type='text' placeholder='Contraseña'></input>
                    
                    <div className='bold-text'>Repetir contraseña</div>
                        <input type='text' placeholder='Contraseña'></input>

                    <div className='bold-text'>Dirección</div>
                        <input type='text' placeholder='Dirección'></input>
                    
                    <button className='button' style={{textAlign:'center', alignSelf:'center', margin:'4%'}}>
                            Actualizar perfil
                    </button>
                </div>
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
  
  export default AdminProfilesUpdate;