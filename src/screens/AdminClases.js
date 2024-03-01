import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';


const useStyles = makeStyles(() => ({
  addLessonsButton: {
    float: 'right',
  },
  lessonsContainer: {
    marginTop: '30px',
    display: 'flex',
    flexWrap: 'wrap',
  },

  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#2196f3',
    color: '#fff',
  },

}));



const Box = () => {
  return (
    <div className="box">
      <div className="clase">
        <div className="overlap-group" style={{ marginLeft: '-5rem' }}>
          <div className="rectangle" />
          <div className="nombre-educador">
            Nombre
            <br />
            <br />
            Educador Asociado
            <br />
            <br />
            Nº Alumnos
            <br />
            <br />
            Información
          </div>
          <EditIcon className="edit-fill" />
          <DeleteIcon className="trash" />
        </div>
      </div>
    </div>
  );
};

const AdminClases = () => {
  const classes = useStyles();

  const [lessons, setLessons] = useState([
    { nombre: 'Clase 1', descripcion: 'Clase introducción', alumnos: 20, educador: 'Juan' },
    { nombre: 'Clase 2', descripcion: 'Clase desarrollo', alumnos: 15, educador: 'María' },
    { nombre: 'Clase 3', descripcion: 'Clase avanzada', alumnos: 18, educador: 'Pedro' },
    { nombre: 'Clase 5', descripcion: 'Clase práctica', alumnos: 25, educador: 'Ana' },

    { nombre: 'Clase 4', descripcion: 'Clase práctica', alumnos: 25, educador: 'Ana' },
  ]);

  

 

  

  const Label = () => {
    return (
      <div className="label">
        
        <div className="label text-wrapper">
        <AddCircleIcon fontSize='large' />
          Crear Clase
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <HeaderAdmin />
      <div className='admin-main'>

            {/* Change selected for the name of your screen */}
            <MenuAdmin selected='Clases' />
            <div className='vertical-line'></div>  

            <div className='admin-container'>
              <Label />
            
          
                
                {/* INTRODUCE HERE YOUR IMPLEMENTATIONS */}
                <div className={classes.lessonsContainer}>
                  {lessons.map((lesson, index) => (
                    <Box key={index} />
                  ))}
                </div>

            </div>
        </div> 

      <div className="main">
        
        
        
      </div>
    </div>
  );
};

export default AdminClases;



