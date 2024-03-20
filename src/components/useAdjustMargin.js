import { useState, useEffect } from 'react';

export default function useAdjustMargin() {
  const [marginTop, setMarginTop] = useState('0px');

  useEffect(() => {
    const adjustIntroMargin = () => {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const extraMargin = 30; 
      setMarginTop(`${headerHeight + extraMargin}px`); 
    };

    window.addEventListener('resize', adjustIntroMargin);
    adjustIntroMargin();

    return () => {
      window.removeEventListener('resize', adjustIntroMargin);
    };
  }, []);

  return marginTop;
}