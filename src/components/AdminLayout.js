import React from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import MenuAdmin from '../components/MenuAdmin';

const AdminLayout = ({ children, selected }) => (
  <div className='App'>
    <HeaderAdmin />
    <div className='admin-main'>
      <MenuAdmin selected={selected} />
      <div className='vertical-line'></div>
      <div className='admin-container'>
        {children}
      </div>
    </div>
  </div>
);

export default AdminLayout;