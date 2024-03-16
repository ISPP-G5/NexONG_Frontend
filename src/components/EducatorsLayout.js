import React from 'react';
import HeaderEducator from './HeaderEducators';
import MenuEducator from './MenuEducators';
const EducatorLayout = ({ children, selected }) => (
    <div className='App'>
      <HeaderEducator />
      <div className='admin-main'>
        <MenuEducator selected={selected} />
        <div className='vertical-line'></div>
        <div className='admin-container'>
          {children}
        </div>
      </div>
    </div>
  );
  
  export default EducatorLayout;