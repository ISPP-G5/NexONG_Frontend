import { useState, useEffect } from 'react';

const useToken = () => {
  const getToken = () => {
    return localStorage.getItem('accessToken');
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem('accessToken', token);
    setToken(token);
  };

  return [token, saveToken];
};

export default useToken;
