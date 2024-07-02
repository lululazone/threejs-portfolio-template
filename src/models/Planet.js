import React, {useRef} from 'react';
export class Planet {

    //id: id of the planet
    //map: texture of the planet
    //emissiveMap: texture of the planet when it's lighted
    //name: name of the planet
    //sunScale: scale of the sun (to give impression of far away sun)
    //desc: description of the planet
    //anneau: if the planet has a ring
    //atmosphereColor: color of the atmosphere
    constructor(id,map,emissiveMap,name,sunScale,desc,anneau,atmosphereColor) {
        this.id = id;
        this.map = map;
        this.emissiveMap = emissiveMap;
        this.name = name;
        this.sunScale = sunScale;
        this.desc = desc;
        this.anneau = anneau;
        this.atmosphereColor = atmosphereColor;
    }

    getID() {
        return this.id;
    }

    getMap() {
        return this.map;
    }

    getEmissiveMap() {
        return this.emissiveMap;
    }

    getName() {
        return this.name;
    }

    getSunScale() {
        return this.sunScale;
    }

    getDesc() {
        return this.desc;
    }

    getAnneau() {
        return this.anneau;
    }

}