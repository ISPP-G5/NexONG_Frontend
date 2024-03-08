import React from 'react';
import '../styles/styles.css';
import AdminLayout from '../components/AdminLayout';


const AdminProfilesUpdate = () => {
    return (
      <div className='App'>
         
            <AdminLayout>
                <div className='update-container' style={{marginLeft:'12.5%'}}>
                <div style={{alignSelf:'center'}}> 
                  <img src="https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg" alt={"imagen"} style={{ 
                      maxWidth: '90%', 
                      maxHeight: '90%', 
                      borderRadius: '100%',
                    }}  />
                </div>
                    <div style={{ alignSelf: 'center', fontWeight: 'bold'}}
                        >Nombre</div>
                        
                    <div className='bold-text'>Email</div>
                        <input type='text' placeholder='Email'></input>

                    <div className='bold-text'>Teléfono</div>
                        <input type='text' placeholder='Número de teléfono'></input>

                    <div className='bold-text'>Contraseña</div>
                        <input type='text' placeholder='Contraseña'></input>
                    
                    <div className='bold-text'>Repetir contraseña</div>
                        <input type='text' placeholder='Contraseña'></input>

                    <button className='button' style={{textAlign:'center', alignSelf:'center', margin:'4%'}}>
                            Actualizar perfil
                    </button>
              </div>
              </AdminLayout>
        </div>
        
    )
  
  };
  
  export default AdminProfilesUpdate;