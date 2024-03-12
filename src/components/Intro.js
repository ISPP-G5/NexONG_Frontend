import React from 'react';
import { Link } from 'react-router-dom';

const Intro = ({ title, description }) => {
    return (
        <div className="intro-container">
            <div className="intro-text">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Intro;