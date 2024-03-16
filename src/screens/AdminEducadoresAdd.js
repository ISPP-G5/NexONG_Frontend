import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import AdminLayout from '../components/AdminLayout';
import axios from 'axios';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function AdminEducadores() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [id_number, setId_number] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fecha,setFecha] = useState("");
  const [email, setEmail] = useState("");

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
      name: name,
      surname: surname,
      id_number: id_number,
      phone: phone,
      role: "EDUCATOR",
      password: password,
      email: email,
      educator:id,
      avatar: "https://avatars.githubusercontent.com/u/43956",
    });
    console.log('update', update);
    const { data } = update;
    if (data.message) {
      window.alert(data.message);
    } else {
      window.alert("Usuario creado con éxito.")
    }

  }

  return (
    <AdminLayout>
      <div className='admin-container'>
        <div className='pantallas'>
          <Link to="/AdminEducadores">
            Nuestros Educadores
          </Link>
          <Link to="/AdminAñadirEducador" className="selected-pantalla">
            Añadir Educador</Link>
        </div>
        <div className='update-container' style={{ marginLeft: '12.5%', marginTop: '2.5%' }}>
          <div className='bold-text'>Nombre</div>
          <input value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            placeholder='Nombre'></input>

          <div className='bold-text'>Apellido</div>
          <input value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type='text'
            placeholder='Primer Apellido'></input>

          <div className='bold-text'>Identificación</div>
          <input value={id_number}
            onChange={(e) => setId_number(e.target.value)}
            type='text'
            placeholder='DNI/NIE/Pasaporte'></input>

          <div className='bold-text'>Email</div>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Email'></input>

          <div className='bold-text'>Teléfono</div>
          <input value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type='tel'
            placeholder='Número de teléfono'></input>

          <div className='bold-text'>Contraseña</div>
          <input value={password}
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
        </div>
    </AdminLayout>
  );
}

export default AdminEducadores;