// src/components/Arrows.js
import React from 'react';
import './Arrow.css';

const Arrows = ({ onLeftClick, onRightClick }) => {
    return (
        <>
            <div className="arrow arrow-left" onClick={onLeftClick}>
                &#9664;
            </div>
            <div className="arrow arrow-right" onClick={onRightClick}>
                &#9654;
            </div>
        </>
    );
};

export default Arrows;
