import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import PersonCard from '../components/PeopleCard';
import LayoutProfiles from '../components/LayoutProfiles';
import axios from 'axios';
import Pantallas from './Pantallas';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

function ShowType({ type,pantallas,añadir,voluntariosAceptados,voluntariosData }) {
    //Type represents the type of the entity that is going to be received (educator,volunteer,partner)
    const [typeList, setTypeList] = useState([]);

    useEffect(() => {
        axios.get(`${API_ENDPOINT}user/`)
            .then(response => {
                if(añadir){
                    setTypeList(datosVoluntarios(response.data,voluntariosData));
                }else if(voluntariosAceptados){
                    setTypeList(datosVoluntarios(response.data,voluntariosData))
                }else{
                setTypeList(response.data.filter(u => u.role === type));
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [type, añadir, voluntariosData, voluntariosAceptados]);

    const descargarDocumentacion = (voluntario) =>{
        const documento = voluntario[0].enrollment_document;
        const nombreArchivo = 'documento.pdf'; // Puedes cambiar el nombre del archivo según lo necesites
    
        // Crear un objeto Blob a partir de los datos del documento
        const blob = new Blob([documento], { type: 'application/pdf' });
    
        // Crear un enlace temporal
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = window.URL.createObjectURL(blob);
        enlaceDescarga.download = nombreArchivo;
    
        // Hacer clic en el enlace para descargar el archivo
        enlaceDescarga.click();
        window.alert("Se descarga vacio porque la api pasa enlaces en vez de archivos");
    }
    

    const aceptarSolicitud = async (voluntario) => {
        voluntario[0].status = "ACCEPTED";
        /*const update = await axios.put(`${API_ENDPOINT}volunteer/${voluntario[0].id}/`,{
            academic_formation: voluntario[0].academic_formation,
            motivation: voluntario[0].motivation,
            status: voluntario[0].status,
            address:voluntario[0].address,
            postal_code: voluntario[0].postal_code,
            enrollment_document: voluntario[0].enrollment_document,
            registry_sheet: voluntario[0].registry_sheet,
            sexual_offenses_document: voluntario[0].sexual_offenses_document,
            scanned_id: voluntario[0].scanned_id,
            minor_authorization: voluntario[0].minor_authorization,
            scanned_authorizer_id: voluntario[0].scanned_authorizer_id,
            birthdate: voluntario[0].birthdate,
            start_date: voluntario[0].start_date,
            end_date: null,

            
        });
        console.log('update',update);
        const {data} = update;
        if (data.message){
            window.alert(data.message);
        }else{
            window.alert("Usuario actualizado con éxito.")
        }*/
        window.alert("Usuario no puede ser aceptado, la funcionalidad esta comentada hasta nuevo aviso.")
   }
    
    const denegarSolicitud = async(id) =>{
        if(!id || id <= 0){
            window.alert('La id no es valida')
        }else{
            await axios.delete(`${API_ENDPOINT}user/${id}/`);
            window.alert("Persona eliminada correctamente")
            window.location.reload(); // Recarga la ventana después de eliminar


        }

    }

    const datosVoluntarios = (data, voluntariosData) => {
        let Data = [];
    
        for (let item of data) {
            for (let vol of voluntariosData) {
                if (item.volunteer === vol.id) {
                    Data.push(item);
                }
            }
        }
    
        return Data;
    }
    

    

    return (
        <LayoutProfiles profile={'admin'} selected={type === "VOLUNTEER" ? 'Voluntarios': type === "EDUCATOR" ? 'Educadores': type === "PARTNERS" ? 'Socios' : ''}>
            <Pantallas pantallas={pantallas} />
            {typeList.map((t, index) => (
                <PersonCard key={index} person={t} añadir={añadir} voluntariosData={voluntariosData} descargar={descargarDocumentacion} aceptar={aceptarSolicitud} denegar={denegarSolicitud}/>
            ))}
        </LayoutProfiles>
    );
}

export default ShowType;