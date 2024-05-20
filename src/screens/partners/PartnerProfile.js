import React from 'react';
import '../../styles/styles.css';
import LayoutProfiles from '../../components/LayoutProfiles';
import Profile from '../../components/Profile';


const PartnerProfile = () => {

  return (
      <LayoutProfiles profile={'socio'}>
        <Profile usuario={'socio'} />
      </LayoutProfiles>
  );
};

export default PartnerProfile;
