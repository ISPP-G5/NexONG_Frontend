import React, { useEffect, useState } from 'react';

const Intro = ({ title, description }) => {
    const [marginTop, setMarginTop] = useState('0px');

    useEffect(() => {
        const adjustIntroMargin = () => {
            const headerHeight = document.querySelector('.header').offsetHeight;
            setMarginTop(`${headerHeight}px`);
        };

        window.addEventListener('resize', adjustIntroMargin);
        adjustIntroMargin();

        return () => {
            window.removeEventListener('resize', adjustIntroMargin);
        };
    }, []);

    return (
        <div className="intro-container" style={{ marginTop }}>
            <div className="intro-text">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Intro;