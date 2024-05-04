import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import axios from 'axios';
import Pantallas from '../../components/Pantallas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../../components/useToken';
import avatarImage from '../../logo/teacher.png';

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
  const [token, updateToken] = useToken();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [telefono, SetTelefono] = useState("");
  const [clave, setPassword] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [correo, setCorreo] = useState("");
  const phoneFormat = /^[6-9]\d{8}$/;  const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const letters = /^[A-Za-zñÑáéíóúÁÉÍÓÚ]+$/;
  const spanishIdFormat = /^[XYZ]?\d{5,8}[A-Z]$/;
  const navigate = useNavigate();

  
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const config_admin = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  };

  const createUser = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    //se hace un post a educadores para crear una entidad en la tabla. Esta la usaremos luego para asignar al campo
    //educator de la clase user que vamos acrear
    if (!fecha || fecha === '') {
      toast.error("Se debe de insertar una fecha")
    } else if (!nombre || nombre === '') {
      toast.error("Se debe de insertar un nombre")
    } else if (!apellido || apellido === '') {
      toast.error("Se debe de insertar un apellido")
    } else if (!correo || correo === '') {
      toast.error("Se debe de insertar un correo")
    } else if (!identificacion || identificacion === '') {
      toast.error("Se debe de insertar una identificación")
    } else if (!telefono || telefono === '') {
      toast.error("Se debe de insertar un telefono")
    } else if (!phoneFormat.test(telefono)) {
      toast.error("Formato de teléfono inválido");
    } else if (!identificacion.match(spanishIdFormat)) {
      toast.error('Formato de identificación inválido');
    } else if (nombre.length > 75) {
      toast.error('Ha introducido mayor número de carácteres que el permitido');
    } else if (apellido.length > 75) {
      toast.error('Ha introducido mayor número de carácteres que el permitido');
    } else if (!emailFormat.test(correo)) {
      toast.error('Formato de correo inválido');
    } else if (!nombre.match(letters) || !apellido.match(letters)) {
      toast.error('Nombre y apellido no puede contener números');
    } else if (!clave || clave === '') {
      toast.error("Se debe de insertar una contraseña")
    } else {
      const educatorData = new FormData();
      educatorData.append('birthdate', fecha);
      educatorData.append('description', descripcion);

      try {
        const response = await axios.post(`${API_ENDPOINT}educator/`, 
        educatorData, config_admin);
        const id = response.data.id;        
        const username = `${nombre} ${apellido}`;
  
        const userData = new FormData();
        userData.append('first_name', nombre);
        userData.append('last_name', apellido);
        userData.append('email', correo);
        userData.append('username',username)
        userData.append('id_number', identificacion);
        userData.append('phone', telefono);
        userData.append('password', clave);
        userData.append('role', "EDUCADOR");
        userData.append('is_agreed', true);
        userData.append('educator', id);
        try {
          const userUpdate = await axios.post(`${API_ENDPOINT}auth/users/`, 
          userData, config);
          console.log(userUpdate);
                
          toast.success('Educador credo con exito');
    
          navigate('/admin/educadores');
        } catch (error) {
          if (error.response && error.response.data) {
            // If the error response and data exist, show the error message from the backend
            Object.entries(error.response.data).forEach(([key, value]) => {
              toast.error(`${value}`);
            });
          } else {
            // If the error response or data doesn't exist, show a generic error message
            toast.error('Error al crear el voluntario');
          }
        }
      } catch(error){
        Object.entries(error.response.data).forEach(([key, value]) => {
          if (key == "email") toast.error("Ya existe un usuario con ese correo");
        });
      }
    }
  }

  return (
    <LayoutProfiles profile='admin' selected='Educadores'>
      <ToastContainer autoClose={5000} />
      <Pantallas pantallas={pantallas} />
      <div className='register-container admin' >
        <label>Nombre</label>
        <input value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          type='text'
          placeholder='Nombre'></input>

        <label>Apellido</label>
        <input value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          type='text'
          placeholder='Primer Apellido'></input>

        <label>Identificación</label>
        <input value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
          type='text'
          placeholder='DNI/NIE/Pasaporte'></input>

        <label>Email</label>
        <input value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          type='email'
          placeholder='Email'></input>

        <label>Teléfono</label>
        <input value={telefono}
          onChange={(e) => SetTelefono(e.target.value)}
          type='tel'
          placeholder='Número de teléfono'></input>

        <label>Contraseña</label>
        <input value={clave}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Contraseña'></input>

        <label>Fecha de nacimiento</label>
        <input value={fecha}
          id="date"
          label="Birthday"
          type="date"
          placeholder='dd/mm/yyyy'
          onChange={(e) => setFecha(e.target.value)}
        ></input>
        <label>Descripción</label> 
         <textarea value={descripcion}
          id="description"
          label="Description"
          type="text"
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>

        <button onClick={createUser} className='register-button admin' style={{ textAlign: 'center', alignSelf: 'center', margin: '4%' }}>
          Crear perfil
        </button>
      </div>
    </LayoutProfiles>
  );
};

export default AdminEducatorsAdd;