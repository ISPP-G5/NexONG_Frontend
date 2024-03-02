import React from 'react';
import '../styles/styles.css'
import { Link } from 'react-router-dom';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';

const labelStyle = {
    width: '350px',
    height: '40.78px',
    marginLeft: '-10px', 
    top: '100.83px',
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: '505',
    fontSize: '15px',
    lineHeight: '70px',
    color: '#7C838A',
    textAlign: 'left' 
    
  };
const Formulario = () => {
    return (
        <div className="App">
            <div className='main'>
                <div className='flex-container-add-educator' style={{marginTop:'-5%'}} >
                    <div className='title-text' style={{ textIndent: '50px', fontSize: '27px' }}>
                        Añadir educador
                    </div>
                    <a style={labelStyle}>Correo electrónico</a>
                    <input
                        type='text'
                        placeholder='Escriba su Correo electrónico'
                        style={{ borderRadius: '15px' }}
                    />
                    <a style={labelStyle}> 
                        Nombre y apellidos
                    </a>
                    <input
                        type='text'
                        placeholder='Escriba su nombre completo'
                        style={{ borderRadius: '15px' }}
                    />
                    <a style={labelStyle}>
                        Información
                    </a>
                    <input
                        type='text'
                        placeholder='Escriba información adicional sobre el educador'
                        style={{ borderRadius: '15px' }}
                    />
                    <button className='button' style={{fontWeight: 'bold',marginLeft:'25%',marginRight:'25%' }}>Añadir educador</button>
                </div>
            </div>
        </div>
    )

};


const AEducadoresAdd = () => {
    return (
        <>
            <div className='App'>
                <HeaderAdmin />
                <div className='admin-main'>
                    <MenuAdmin selected='Familias' />
                    <div className='vertical-line'></div>
                    <div className='admin-container'>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'flex-end', marginTop: '1%' }}>
                            <img src={'https://lamenteesmaravillosa.com/wp-content/uploads/2018/09/hombre-creido-pensando-que-sabe.jpg'} alt={"imagen de admin "} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
                            <Link to={'/'} style={{ marginRight: '2%', color: 'black', fontSize: '20px', marginBottom: '20px' }}>Admin</Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end', justifyContent: 'flex-start', marginTop: '1%' }}>
                            <Link to={'/admin-educadores'} style={{ marginRight: '2%', color: 'black', fontSize: '20px', marginBottom: '20px' }}>Volver</Link>
                        </div>
                        <Formulario />

                    </div>
                </div>
            </div>
        </>

    );
}

export default AEducadoresAdd;