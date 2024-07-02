// src/components/PortfolioItem.js
import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { TextureLoader } from 'three';
import { startTransition } from 'react';
import { AtmosphereShader } from '../shaders/AtmosphereShader';
import {RingShader, RockRingShader} from '../shaders/RingShader';
import * as THREE from 'three';

let actualPosition = [0, 0, 0];
const PortfolioItem = ({ ref, model, dir, onClick, zoomed }) => {
    const mesh = useRef();
    const atmosphereMesh = useRef();
    const { camera } = useThree();
    const [texture, setTexture] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [additionalTexture, setAdditionalTexture] = useState(null);
    const [ringTexture, setRingTexture] = useState(null);
    const ringMesh = useRef();

    useEffect(() => {
        startTransition(() => {
            setTexture(model.map);
            if(model.anneau != null){
                setRingTexture(model.anneau.getMap());
            }
            setAdditionalTexture(model.emissiveMap);
        });
    }, [model]);

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.01;
            actualPosition = mesh.current.position;
        }
        if (atmosphereMesh.current) {
            atmosphereMesh.current.material.uniforms.viewVector.value = camera.position.clone().sub(atmosphereMesh.current.position).normalize();
        }
    });

    const { scale, position } = useSpring({
        position: zoomed ? [0, 0, 0] : [0, 0, 0],
        scale: zoomed ? [4, 4, 4] : [1, 1, 1],
        from: {
            position: zoomed ? [0, 0, 0] : [dir, 0, 0],
            scale: [1, 1, 1]
        },
        reset: false,
        reverse: false,
        config: { tension: 20, friction: 10 },
    });

    if (!texture) {
        return null; // Return null or a loading indicator while texture is loading
    }

    return (
        <a.group position={position} scale={scale}>
            <a.mesh
                ref={mesh}
                onClick={onClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[1, 32, 32]} />
                {additionalTexture != null ?
                    <a.meshPhongMaterial map={texture} emissiveMap={additionalTexture} emissive={"white"} emissiveIntensity={1} />
                    :
                    <a.meshPhongMaterial map={texture} />
                }
            </a.mesh>

            {/* Atmosphere */}
            <a.mesh ref={atmosphereMesh} scale={[1.05, 1.05, 1.05]} position={[0, 0, 0]}>
                <sphereGeometry args={[1, 32, 32]} />
                <shaderMaterial
                    uniforms={{
                        viewVector: { value: new THREE.Vector3(0, 0, 0) },
                        c: { value: 1.0 },
                        p: { value: 5.0 },
                        glowColor: { value: model.atmosphereColor }

                    }}
                    vertexShader={AtmosphereShader.vertexShader}
                    fragmentShader={AtmosphereShader.fragmentShader}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                    transparent
                />
            </a.mesh>
            {/* Rings */}
            {model.anneau && <a.mesh ref={ringMesh} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <ringGeometry args={[1.2, 1.5, 64]} />
                <shaderMaterial
                    uniforms={{
                        color: { value: new THREE.Color(0x6c603c) }
                    }}
                    vertexShader={RockRingShader.vertexShader}
                    fragmentShader={RockRingShader.fragmentShader}
                    transparent
                    side={THREE.DoubleSide}
                />
            </a.mesh>}

        </a.group>
    );
};

export default PortfolioItem;
