import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import axios from 'axios';
import Pantallas from '../../components/Pantallas';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const pantallas = [
  {
    pantalla: 'Nuestros educadores',
    link: '/admin/educadores',
    selected: false,
  },
  {
    pantalla: 'Añadir educador',
    link: '/admin/educadores/agregar',
    selected: true,
  }
];

function AdminEducatorsAdd() {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [telefono, SetTelefono] = useState("");
  const [clave, setPassword] = useState("");
  const [fecha,setFecha] = useState("");
  const [correo, setCorreo] = useState("");

  const createUser = async () => {

    //se hace un post a educadores para crear una entidad en la tabla. Esta la usaremos luego para asignar al campo
    //educator de la clase user que vamos acrear
    await axios.post(`${API_ENDPOINT}educator/`, {
      birthdate: fecha,
    });
    //como la entidad de arriba es la ultima que se crea en la base de datos accedemos a esta posción y sacamos la id

    axios.get(`${API_ENDPOINT}educator/`)
            .then(response => {
              setId(response.data[response.data.length - 1].id);
            })
            .catch(error => {
                console.error(error);
            });

    const update = await axios.post(`${API_ENDPOINT}user/`, {
      name: nombre,
      surname: apellido,
      id_number: identificacion,
      phone: telefono,
      role: "EDUCATOR",
      password: clave,
      email: correo,
      educator:id,
      avatar: "https://avatars.githubusercontent.com/u/43956",
    });
    const { datos } = update;
    if (datos.message) {
      window.alert(datos.message);
    } else {
      window.alert("Usuario creado con éxito.")
    }

  }

  return (
    <LayoutProfiles profile='admin' selected='Educadores'>
        <Pantallas pantallas={pantallas} />
        <div className='update-container' style={{ marginLeft: '12.5%', marginTop: '2.5%' }}>
          <div className='bold-text'>Nombre</div>
          <input value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type='text'
            placeholder='Nombre'></input>

          <div className='bold-text'>Apellido</div>
          <input value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            type='text'
            placeholder='Primer Apellido'></input>

          <div className='bold-text'>Identificación</div>
          <input value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            type='text'
            placeholder='DNI/NIE/Pasaporte'></input>

          <div className='bold-text'>Email</div>
          <input value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            type='email'
            placeholder='Email'></input>

          <div className='bold-text'>Teléfono</div>
          <input value={telefono}
            onChange={(e) => SetTelefono(e.target.value)}
            type='tel'
            placeholder='Número de teléfono'></input>

          <div className='bold-text'>Contraseña</div>
          <input value={clave}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Contraseña'></input>
          
          <div className='bold-text'>Fecha</div>
            <input value={fecha}
              id="date"
              label="Birthday"
              type="date"
              className='asam-input'
              placeholder='dd/mm/yyyy'
              onChange={(e) => setFecha(e.target.value)}
            ></input>
          
            <button onClick={createUser} className='button' style={{ textAlign: 'center', alignSelf: 'center', margin: '4%' }}>
              Crear perfil
            </button>
          </div>
    </LayoutProfiles>
  );
}

export default AdminEducatorsAdd;