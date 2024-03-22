import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Limpiamos el ID de usuario del almacenamiento local
    navigate('/'); // Redireccionar a la página de inicio
  };

  return (
    
    <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
  );
};

export default LogoutButton;
