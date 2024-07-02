// src/components/Arrows.js
import React from 'react';
import './Arrow.css';

const ArrowsDetail = ({ onTopClick }) => {
    return (
        <>
            <div className="up-arrow" onClick={onTopClick}>
                &#9664;
            </div>
        </>
    );
};

export default ArrowsDetail;
