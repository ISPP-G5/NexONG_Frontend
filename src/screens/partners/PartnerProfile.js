import React from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import Profile from '../../components/Profile';
import { useNavigate } from 'react-router-dom';


const PartnerProfile = () => {

  const navigate = useNavigate();

  const handleRenewClick = () => {
    navigate('/socio/renovar');
  };

  const handleDrop = () => {
    navigate('/socio/baja');
  };


  return (
    <>
      <LayoutProfiles profile={'socios'}>
        <Profile usuario={'socios'} />
      </LayoutProfiles>
      {/* Button completely outside LayoutProfiles and Profile components */}
      <div className="partners-button-container">
        <button className="partners-button" onClick={handleRenewClick}>
          Renovar o cambiar cuota
        </button>
        <button className="partners-button" onClick={handleDrop}>
          Baja 
        </button>
      </div>
    </>
  );
};

export default PartnerProfile;
