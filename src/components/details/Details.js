import ArrowDetail from "../ArrowDetail";
import React from "react";
import "./details.css";

import { Card } from 'primereact/card';
import Contact from "../DetailsPages/Contact";
import Presentation from "../DetailsPages/Presentation";
import Studies from "../DetailsPages/Studies";
import Experience from "../DetailsPages/Experience";
import Skills from "../DetailsPages/Skills";


const Details = ({model}) =>{

    switch (model.id) {
        case 0:
            return <Presentation model={model} />;
        case 1:
            return <Studies model={model} />;
        case 2:
            return <Experience model={model} />;
        case 3:
            return <Skills model={model} />;
        case 4:
            return <Contact model={model} />;
        default:
            return <div>No details available</div>;
    }
}

export default Details;