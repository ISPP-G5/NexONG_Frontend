import React, { useEffect, useState } from 'react';
import '../../styles/styles.css';
import ShowType from '../../components/ShowAdminProfiles';
import axios from 'axios';
import DownloadIcon from '@mui/icons-material/Download';
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
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    axios.get(`${API_ENDPOINT}donation/`)
      .then(response => {
        setDonations(response.data)
      }
      );

  }, []);

  const handleDownload = () => {
    window.location.href = 'http://localhost:8000/api/export/pdf/donations';
  }
  const userPartners = useFetchUsersByRole(API_ENDPOINT, "SOCIO");

  return (
    <div>
      <ShowType
        data={userPartners}
        type="Socios"
        pantallas={pantallas}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5%' }}>
        <button className="button-create" onClick={handleDownload}>
          <DownloadIcon />
          Donaciones
        </button>

      </div>
    </div>
  );

}

export default AdminPartners;