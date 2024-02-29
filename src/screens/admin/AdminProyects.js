import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import '../../styles/styles.css';


const useStyles = makeStyles((theme) => ({
  projectBox: {
    width: '80%', 
    margin: '10px auto', 
    padding: '10px',
    border: '1px solid #ccc',
    backgroundColor: '#d6eaf8',
    color: 'rgb(0, 0, 0)',
    boxSizing: 'border-box',
    borderRadius: '10px',
    textAlign: 'left', 
  },
  createProjectButton: {
    marginBottom: '10px',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    marginRight: '5px',
  },
  editButton: {
    backgroundColor: '#2196f3',
    color: '#fff',
  },
  starsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  star: {
    color: '#ffcc00',
    marginRight: '2px',
  },
  profileText: {
   
    textDecoration: 'underline', 
    marginRight: theme.spacing(5),
  },
  profilePicture: {

    position: 'relative',

    top: theme.spacing(1),
    marginRight: theme.spacing(1),


    width: '62px',

    height: '62px',

    borderRadius: '50%',

    backgroundColor: '#D9D9D9',

  },
}));

const AdminProjects = () => {
  const classes = useStyles();

  const [projects, setProjects] = useState([
    { nombre: 'Proyecto 1', campo1: 3, campo2: 4, campo3: 2, campo4: 5, campo5: 1, campo6: 3 },
    { nombre: 'Proyecto 2', campo1: 5, campo2: 3, campo3: 4, campo4: 2, campo5: 4, campo6: 5 },
    { nombre: 'Proyecto 3', campo1: 2, campo2: 1, campo3: 3, campo4: 4, campo5: 2, campo6: 1 },
  ]);

  const handleDeleteProject = (index) => {
    const newProjectList = [...projects];
    newProjectList.splice(index, 1);
    setProjects(newProjectList);
  };

  const handleEditProject = (index) => {
  };

  const handleCreateProject = (index) => {
  };

  const renderStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<span key={i} className={classes.star}>★</span>);
    }
    return stars;
  };

  return (
    <div className="App">
      <div className='main'>
      <div className= 'header'>
            <div className={classes.profilePicture} />
            <div className={classes.profileText}>Admin</div>
        </div>
      <button className='button' onClick={handleCreateProject}>
        Create New Project
      </button>
      {projects.map((project, index) => (
        <div key={index} className={classes.projectBox}>
          <Typography variant="h6">{project.nombre}</Typography>
          <div className={classes.starsContainer}>
            <Typography variant="body1">Campo 1: {renderStars(project.campo1)}</Typography>
            <Typography variant="body1">Campo 2: {renderStars(project.campo2)}</Typography>
            <Typography variant="body1">Campo 3: {renderStars(project.campo3)}</Typography>
          </div>
          <div className={classes.starsContainer}>
            <Typography variant="body1">Campo 4: {renderStars(project.campo4)}</Typography>
            <Typography variant="body1">Campo 5: {renderStars(project.campo5)}</Typography>
            <Typography variant="body1">Campo 6: {renderStars(project.campo6)}</Typography>
          </div>
          <Button className={classes.deleteButton} onClick={() => handleDeleteProject(index)}>Delete</Button>
          <Button className={classes.editButton} onClick={() => handleEditProject(index)}>Edit</Button>
        </div>
      ))}





      </div>

    </div>
  );
};

export default AdminProjects;




