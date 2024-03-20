import React from 'react';
import HeaderProfiles from './HeaderProfiles';
import MenuProfiles from './MenuProfiles';

function LayoutProfiles ({ profile, selected, children }) {

  return(
    <div className='App'>
      <HeaderProfiles profile={profile}/>
      <div>
        <MenuProfiles profile={profile} selected={selected} />
        <div className='profiles-container'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutProfiles;