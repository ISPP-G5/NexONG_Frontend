// useToken.js
import { useState, useEffect } from 'react';

const useToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Fetch the token from localStorage when the hook is used
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to update the token
  const updateToken = (newToken) => {
    localStorage.setItem('accessToken', newToken);
    setToken(newToken);
  };

  return [token, updateToken];
};

export default useToken;
