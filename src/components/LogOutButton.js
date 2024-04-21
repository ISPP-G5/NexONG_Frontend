import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleContext from './RoleContext';
const LogoutButton = () => {
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext);


  const handleLogout = () => {
    localStorage.removeItem('userId'); // Limpiamos el ID de usuario del almacenamiento local
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('role'); 
    setRole(null);

    navigate('/'); // Redireccionar a la página de inicio
  };

  return (
    
    <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
  );
};

export default LogoutButton;
