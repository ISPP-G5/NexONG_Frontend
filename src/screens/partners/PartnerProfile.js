import React from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import Profile from '../../components/Profile';

const PartnerProfile = () => {
  return (
    <>
      <LayoutProfiles profile={'socios'}>
        <Profile usuario={'socios'} />
      </LayoutProfiles>
      {/* Button completely outside LayoutProfiles and Profile components */}
      <div className="partners-button-container">
        <button className="partners-button" onClick={() => {/* Your button click handler logic here */}}>
          Renovar o cambiar cuota
        </button>
        <button className="partners-button" onClick={() => {/* Your button click handler logic here */}}>
          Baja 
        </button>
      </div>
    </>
  );
};

export default PartnerProfile;
