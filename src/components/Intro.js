import React, { useEffect, useState } from 'react';
import '../styles/styles.css';

const Intro = ({ title, description, image }) => {
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
        <div className={`intro-container ${image}`} style={{ marginTop }}>
            <div className="intro-text">
                <h1>{title}</h1>
                {description && <p>{description}</p>}
            </div>
        </div>
    );
};

export default Intro;