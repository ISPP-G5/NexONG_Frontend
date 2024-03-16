import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


const UpdateProfile = ({tipo}) => {

    const id = localStorage.getItem('userId');
    const [avatar, setAvatar] = useState("");

    const [valoresList, setValores] = useState([]);

    useEffect(() => {

      axios.get(`${API_ENDPOINT}user/`)
        .then(response => {
          setValores(response.data.find(x=>x.id==parseInt(id,10)));
            console.log("name", name)
            setAvatar(valoresList.avatar)
        })
        .catch(error => {
          console.error(error);
        });

    }, []);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [id_number, setId_number] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [volunteer, setVolunteer] = useState("");
    const [family, setFamily] = useState("");
    const [partner, setPartner] = useState("");
    const [educator, setEducator] = useState("");
    const [education_center, setEducation_center] = useState("");

    const [valoresCorrectos, setValoresCorrectos] = useState(false)
    
    const updateAdmin = async () => {
        
        if(avatar==="" || !avatar){
            setAvatar(valoresList.avatar)
            setValoresCorrectos(true)
        }if(family==="" || !family){
            setFamily(valoresList.family)
            setValoresCorrectos(true)
        }if(partner==="" || !partner){
            setPartner(valoresList.partner)
            setValoresCorrectos(true)
        }if(educator==="" || !educator){
            setEducator(valoresList.educator)
            setValoresCorrectos(true)
        }if(education_center==="" || !education_center){
            setEducation_center(valoresList.education_center)
            setValoresCorrectos(true)
        }if(role==="" || !role){
            setRole(valoresList.role)
            setValoresCorrectos(true)
        }if(volunteer==="" || !volunteer){
            setVolunteer(valoresList.volunteer)
            setValoresCorrectos(true)
        }if(name==="" || !name){
            setName(valoresList.name)
            setValoresCorrectos(true)
        }if(surname==="" || !surname){
            setSurname(valoresList.surname)
            setValoresCorrectos(true)
        }if(id_number==="" || !id_number){
            setId_number(valoresList.id_number)
            setValoresCorrectos(true)
        }if(phone==="" || !phone){
            setPhone(valoresList.phone)
            setValoresCorrectos(true)
        }if(password==="" || !password){
            setPassword(valoresList.password)
            setValoresCorrectos(true)
        }if(email==="" || !email){
            setEmail(valoresList.email)
            setValoresCorrectos(true)
        }if(valoresCorrectos){
            const update = await axios.put(`${API_ENDPOINT}user/${id}/`,{
                name: name,
                surname: surname,
                id_number: id_number,
                phone : phone,
                password: password,
                email: email,
                role: role,
                avatar: avatar,
                family: family,
                partner: partner,
                volunteer: volunteer,
                education_center: education_center,
                educator: educator,
            });
            console.log('update',update);
            const {data} = update;
            if (data.message){
                window.alert(data.message);
            }else{
                window.alert("Usuario actualizado con éxito.")
            }

                setTimeout(window.location.href=`/${tipo}Perfil/`, 1);              
        }
        
   }

   
  

    return (
         
            <div>
                <div className='update-container' style={{marginLeft:'12.5%'}}>
                <div style={{alignSelf:'center'}}> 
                  <img src={valoresList.avatar} alt={"imagen"} style={{ 
                      maxWidth: '90%', 
                      maxHeight: '90%', 
                      borderRadius: '100%',
                    }}  />
                </div>
                
                    <div className='hd-center'>
                        <img src='https://www.pngall.com/wp-content/uploads/8/Red-Warning.png' style={{width:'3.5%'}}/>
                        <strong>Modificar sólo los datos que requieran cambio</strong>
                        <img src='https://www.pngall.com/wp-content/uploads/8/Red-Warning.png' style={{width:'3.5%'}}/>
                    </div>

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


                    <button onClick={updateAdmin} className='button' style={{textAlign:'center', alignSelf:'center', margin:'4%'}}>
                            Actualizar perfil
                    </button>
                </div>
            </div>
        
    )
  
  };
  
  export default UpdateProfile;