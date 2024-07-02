// src/components/Sun.js
import React, {startTransition, useEffect, useRef, useState} from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {MathUtils, TextureLoader} from "three";
import { useSpring, animated } from '@react-spring/three'
import {config} from "@react-spring/web";

const Sun = ({ position ,textureSun,targetScale}) => {
    const sunRef = useRef();
    const [texture, setTexture] = useState(null);
    const scaleSun= 15;



    const { scale} = useSpring(
    { scale:  targetScale,
        config: { tension: 100, friction: 10 }

    }


    );


    useEffect(() => {
        startTransition(() => {
            setTexture(textureSun);
        });
    });





    if (!textureSun) {
        //load texture
        return null;
    }

    return (
        <animated.mesh ref={sunRef} position={position} scale={scale}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshPhongMaterial  emissiveMap={textureSun}  emissive={"white"} emissiveIntensity={5}/>
        </animated.mesh>
    );
};

export default Sun;