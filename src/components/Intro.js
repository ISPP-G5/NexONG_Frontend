import React from 'react';
import '../styles/styles.css';
import useAdjustMargin from './useAdjustMargin';

const Intro = ({ title, description, image }) => {

    const marginTop = useAdjustMargin();

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