// AdminFamilyRequests.js
import '../../styles/styles.css';
import React, { useState, useEffect } from 'react';
import LayoutProfiles from '../../components/LayoutProfiles';
import PersonCard from '../../components/PersonCard';
import Pantallas from '../../components/Pantallas';
import { useFetchFamilies, useFetchStudents } from '../../components/useFetchData';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const pantallas = [
  {
    pantalla: 'Nuestras familias',
    link: '/admin/familias',
    selected: false,
  },
  {
    pantalla: 'Solicitudes',
    link: '/admin/familias/solicitudes',
    selected: true,
  }
];


function AdminFamilyRequests() {
  
  const families = useFetchFamilies(API_ENDPOINT);
  const kids = useFetchStudents(API_ENDPOINT, 'PENDIENTE');
  const [persons, setPersons] = useState([]);

  
  useEffect(() => {
    if (families.length > 0 && kids.length > 0) {
      const newPersons = families.map(family => {
        const kid = kids.find(kid => kid.family === family.id);
        if (kid) {
          return {
            name: family.name,
            kid_id: kid.id,
            surname: `${kid.name} ${kid.surname}`,
            avatar: kid.avatar,
            enrollment_document: kid.enrollment_document
          };
        }
        return null;
      }).filter(person => person !== null);
      setPersons(newPersons);
    }
  }, [families, kids]);

  const handleDescargar = async(person) => {
    // Download the enrollment_document
    const documento = person.enrollment_document;
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
  };

  const handleAceptar = async(person) => {
    
    window.alert("Usuario no puede ser aceptado, la funcionalidad esta comentada hasta nuevo aviso.")
  }

  const handleRechazar = async(person) =>{
      
    window.alert("Usuario no puede ser rechazado, la funcionalidad esta comentada hasta nuevo aviso.")
  }

  return (
    <LayoutProfiles profile='admin' selected='Familias'>
      <Pantallas pantallas={pantallas} />
      {persons.map((t, index) => (
          <PersonCard 
            key={index} 
            person={t} 
            añadir={true} 
            descargar={handleDescargar}
            aceptar={handleAceptar}
            rechazar={handleRechazar}
            trash={false}
            />
      ))}
    </LayoutProfiles>
  );
}

export default AdminFamilyRequests;