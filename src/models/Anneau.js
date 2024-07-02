import * as THREE from "three";

export class Anneau{

    constructor(map,scale){
        this.map = map;
        this.scale = scale;
    }

    getMap(){
        this.map.wrapS = this.map.wrapT = THREE.RepeatWrapping;
        this.map.repeat.set( 2, 2 );
        this.map.rotation = Math.PI/2;
        return this.map;
    }

    getScale(){
        return this.scale;
    }


}