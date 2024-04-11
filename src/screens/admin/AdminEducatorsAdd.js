import React, { useState } from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import axios from 'axios';
import Pantallas from '../../components/Pantallas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [telefono, SetTelefono] = useState("");
  const [clave, setPassword] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [correo, setCorreo] = useState("");
  const phoneFormat = /^[6-9]\d{8}$/;  const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const letters = /^[A-Za-z]+$/;
  const spanishIdFormat = /^[XYZ]?\d{5,8}[A-Z]$/;

  const createUser = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    //se hace un post a educadores para crear una entidad en la tabla. Esta la usaremos luego para asignar al campo
    //educator de la clase user que vamos acrear
    if (!fecha || fecha === '') {
      toast.error("Se debe de insertar una fecha", {
        autoClose: 5000
      })
    } else if (!nombre || nombre === '') {
      toast.error("Se debe de insertar un nombre", {
        autoClose: 5000
      })
    } else if (!apellido || apellido === '') {
      toast.error("Se debe de insertar un apellido")
    } else if (!correo || correo === '') {
      toast.error("Se debe de insertar un correo")
    } else if (!identificacion || identificacion === '') {
      toast.error("Se debe de insertar una identificación")
    } else if (!telefono || telefono === '') {
      toast.error("Se debe de insertar un telefono")
    } else if (!phoneFormat.test(telefono)) {
      toast.error("Formato de teléfono inválido", { autoClose: 5000 });
    }
    else if (!identificacion.match(spanishIdFormat)) {
      toast.error('Formato de identificación inválido');
      return;
    }
    else if (nombre.length > 75) {
      toast.error('Ha introducido mayor número de carácteres que el permitido');
      return;
    }
    else if (apellido.length > 75) {
      toast.error('Ha introducido mayor número de carácteres que el permitido');
      return;
    }
    else if (!emailFormat.test(correo)) {
      toast.error('Formato de correo inválido');
      return;
    }
    else if (!nombre.match(letters) || !apellido.match(letters)) {
      toast.error('Nombre y apellido no puede contener números');
      return;
    }
     else if (!clave || clave === '') {
      toast.error("Se debe de insertar una contraseña")
    } else {
      try {
        const usersResponse = await axios.get(`${API_ENDPOINT}user/`,{
        
        });
        const users = usersResponse.data;
        const existingUser = users.find(user => user.email === correo);
        if (existingUser) {
          toast.error("El correo electrónico ya está registrado", { autoClose: 5000 });
          return;
        }
      } catch (error) {
        toast.error("El correo introducido ya esta registrado", { autoClose: 5000 });
        return;
      }
      await axios.post(`${API_ENDPOINT}educator/`, {
        birthdate: fecha,
      }).catch(error => {
       
      });
    }

    //como la entidad de arriba es la ultima que se crea en la base de datos accedemos a esta posción y sacamos la id
    axios.get(`${API_ENDPOINT}educator/`)
      .then(response => {
        setId(response.data[response.data.length - 1].id);
      })
      .catch(error => {
        toast.error("Error en la solicitud", {
          autoClose: 5000
        });
      });

    if (id) {
      try {
        const update = await axios.post(`${API_ENDPOINT}auth/users/`, {
          first_name: nombre,
          last_name: apellido,
          id_number: identificacion,
          phone: telefono,
          role: "EDUCADOR",
          password: clave,
          email: correo,
          educator: id,
          avatar: avatarImage,
        })

        if (update && update.data && update.data.message) {
          toast.error("Datos inválidos", { autoClose: 5000 });
        } else {
          toast.success("Usuario creado con éxito.", { autoClose: 5000 });
        }
      } catch (error) {
       
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
}

export default AdminEducatorsAdd;