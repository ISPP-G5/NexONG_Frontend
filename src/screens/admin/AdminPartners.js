import React, { useState, useEffect } from 'react';
import '../../styles/styles.css';
import ShowType from '../../components/ShowAdminProfiles';
import axios from 'axios';
import { useFetchUsersByRole, useFetchPartners, useFetchDonations } from '../../components/useFetchData';

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

  const handleDownload = async (format) => {
    const token = localStorage.getItem('accessToken');

    const url = `${API_ENDPOINT}export/${format}/donations`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
  
      a.href = downloadUrl;
      a.download = `donations.${format}`;
      document.body.appendChild(a);
      a.click();
  
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (e) {
      console.error('Error downloading file:', e);
    }
  };

  const token = localStorage.getItem('accessToken');
  const [partnersData, setPartnersData] = useState([]);
  const userPartners = useFetchUsersByRole(API_ENDPOINT, "SOCIO", token);
  const partners = useFetchPartners(API_ENDPOINT, token);
  const donations = useFetchDonations(API_ENDPOINT, token);

  useEffect(() => {
    if (userPartners.length > 0 && partners.length > 0) {
      const fetchAllData = async () => {
        const combinedData = await Promise.all(partners.map(async (partner) => {
          const userData = userPartners.find(user => user.partner === partner.id);
          const donationsData = donations.find(donation => donation.partner === partner.id);          
          return userData ? { ...userData, ...partner, ...donationsData } : null;
        }));
  
        setPartnersData(combinedData.filter(partner => partner !== null));
      };
  
      fetchAllData();
    }
  }, [userPartners, partners, token]);

  return (
      <div>
          <ShowType
              data={partnersData}
              type="Socios"
              pantallas={pantallas}
              download={handleDownload}
          />
      </div>
  );

}

export default AdminPartners;