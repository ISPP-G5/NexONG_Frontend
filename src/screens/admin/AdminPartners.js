import React, { useEffect } from 'react';
import '../../styles/styles.css';
import ShowType from '../../components/ShowAdminProfiles';
import axios from 'axios';
import { useFetchUsersByRole } from '../../components/useFetchData';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const pantallas = [
  {
    pantalla: 'Nuestros socios',
    link: '/admin/socios',
    selected: true,
  },
  {
    pantalla: 'Convocar asamblea',
    link: '/admin/socios/asamblea',
    selected: false,
  }
];


const AdminPartners = () => {
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    axios.get(`${API_ENDPOINT}donation/`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
      console.log(response.data);
  })
  .catch(error => {
      console.error(error);
  });

  }, []);

  const handleDownload = (format) => {
    window.location.href = `http://localhost:8000/api/export/${format}/donations`;
}
const token = localStorage.getItem('accessToken');

const userPartners = useFetchUsersByRole(API_ENDPOINT, "SOCIO", token);

return (
    <div>
        <ShowType
            data={userPartners}
            type="Socios"
            pantallas={pantallas}
        />
        <div style={{ position: 'absolute', top: '20%', right: 0, zIndex: 900 }}>
            <select className="button-download" onChange={(e) => handleDownload(e.target.value)}>
                <option value=""> Formato a descargar</option>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
            </select>
        </div>
    </div>
);

}

export default AdminPartners;