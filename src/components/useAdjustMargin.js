import { useState, useEffect } from 'react';

export default function useAdjustMargin(headerClass = '.header') {
  const [marginTop, setMarginTop] = useState('0px');

  useEffect(() => {
    const adjustIntroMargin = () => {
      const header = document.querySelector(headerClass);
      if (!header) {
        return;
      }
    
      const headerHeight = header.offsetHeight;
      const extraMargin = 30; 
      setMarginTop(`${headerHeight + extraMargin}px`); 
    };

    window.addEventListener('resize', adjustIntroMargin);
    adjustIntroMargin();

    return () => {
      window.removeEventListener('resize', adjustIntroMargin);
    };
  }, [headerClass]);

  return marginTop;
}