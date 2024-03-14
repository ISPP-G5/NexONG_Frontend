import React from 'react';
import HeaderVolunteer from './HeaderVolunteer';
import MenuVolunteer from './MenuVolunteer';

const VolunteerLayout = ({ children, selected }) => (
    <div className='App'>
      <HeaderVolunteer />
      <div className='admin-main'>
        <MenuVolunteer selected={selected} />
        <div className='vertical-line'></div>
        <div className='admin-container'>
          {children}
        </div>
      </div>
    </div>
  );
  
  export default VolunteerLayout;