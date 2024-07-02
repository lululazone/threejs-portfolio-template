
import React from 'react';
import './dialog.css';
import '../../App.css'
const  DialogPlanet = ({model, clicked,visible}) => {

return (
    <div className="popup" style={{display: visible ? 'block' : 'none'}}>
        <div className="line">
        </div>
        <div className="dialog" >
            <h2>Planet {model.name}</h2>
            <p>{model.desc}</p>
            <button className={"button"} onClick={clicked}>Visit</button>
        </div>
    </div>
    );

}

export default DialogPlanet;