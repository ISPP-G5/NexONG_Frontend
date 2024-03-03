import React from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css'
import MenuAdmin from '../components/MenuAdmin';
import HeaderAdmin from '../components/HeaderAdmin';


const AdminProfiles = () => {
    return (
      <>
      <div>
                <HeaderAdmin />
              <div className='admin-main'><MenuAdmin selected='Familias' /> 
              <div className='vertical-line'></div>  

              
                <div className='update-container'>
                <div style={{textAlign:'center', margin:'5%'}}> 
                  <img src="https://covalto-production-website.s3.amazonaws.com/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp" alt={"imagen"} style={{ 
                      maxWidth: '60%', 
                      maxHeight: '60%', 
                      borderRadius: '100%',
                    }}  />
                </div>
                    
                    <div style={{ alignSelf: 'center', fontWeight: 'bold'}}
                        >Simiente</div>

                    <div className='bold-text'>Email</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>simtofe@manosabiertas.com</div>

                    <div className='bold-text'>Teléfono</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>609123324</div>

                    <div className='bold-text'>Contraseña</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>cimientos</div>
                    
                    <div className='bold-text'>Dirección</div>
                        <div className='field-text' style={{margin: '10px', maxWidth: '80%', marginLeft: '10%'}}>C. Manzana 11, 41009, Sevilla</div>

                    <button className='button' style={{textAlign:'center', alignSelf:'center', margin:'4%'}}>
                          <Link to={`/adminPerfilActualizar`}
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
        </div>
      </>
  
    )
  
  };
  
  export default AdminProfiles;