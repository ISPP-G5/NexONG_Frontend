import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchData(API_ENDPOINT, status) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(API_ENDPOINT)
      .then(response => {
        setData(response.data.filter(u => u.status === status));
      })
      .catch(error => {
        console.error(error);
      });
  }, [API_ENDPOINT, status]);

  return data;
}