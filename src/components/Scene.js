// src/components/Scene.js
import React, { useRef } from 'react';
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PortfolioItem from './PortfolioItem';
import { useTransition, a } from '@react-spring/three';
import * as THREE from 'three';
import Sun from './Sun';
import { MathUtils } from 'three';
import { StarFieldShader } from '../shaders/StarFieldShader';
import {
    Autofocus,
    Bloom,
    EffectComposer,
    Outline,
} from '@react-three/postprocessing';
import { KernelSize, Resolution } from 'postprocessing';
import {TextGeometry} from "three/addons";

extend({ TextGeometry });

const Scene = ({ model, onObjectClick, dir, zoomed, sunTexture }) => {
    const transitions = useTransition(model, {
        config: { tension: 280, friction: 10 },
    });
    const lightRef = useRef();
    const meshRef = useRef();
    const skyDomeRadius = 300;
    function Skybox() {
        const { scene, gl } = useThree();
        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                skyRadius: { value: skyDomeRadius },
                env_c1: { value: new THREE.Color("#0d1a2f") },
                env_c2: { value: new THREE.Color("#000000") },
                noiseOffset: { value: new THREE.Vector3(100.01, 100.01, 100.01) },
                starSize: { value: 0.01 },
                starDensity: { value: 0.03 },
                clusterStrength: { value: 0 },
                clusterSize: { value: 0.1 },
                time: { value: 0 }
            },
            vertexShader: StarFieldShader.vertexShader,
            fragmentShader: StarFieldShader.fragmentShader,
            side: THREE.DoubleSide,
        });

        const geometry = new THREE.SphereGeometry(500, 60, 40);
        const skyboxMesh = new THREE.Mesh(geometry, shaderMaterial);
        scene.add(skyboxMesh);

        var clock = new THREE.Clock();
        useFrame(() => {
            shaderMaterial.uniforms.time.value = clock.getElapsedTime();
        });

        return null;
    }

    return (
        <Canvas>
            <Skybox />
            <directionalLight ref={lightRef} position={[15, 0, -15]} intensity={1} castShadow={true} color={'white'} />
            <EffectComposer>
                <Outline hiddenEdgeColor="#99c4ac" edgeStrength={100} />
                <Bloom
                    intensity={5}
                    kernelSize={KernelSize.VERY_LARGE}
                    luminanceThreshold={0.001}
                    luminanceSmoothing={1}
                    mipmapBlur={true}
                    resolutionX={Resolution.AUTO_SIZE}
                    resolutionY={Resolution.AUTO_SIZE}
                />
                <Autofocus />
            </EffectComposer>
            {transitions((style, item) => (
                <a.group style={style}>
                    <Sun position={[15, 0, -15]} textureSun={sunTexture} targetScale={model.sunScale} />
                    <PortfolioItem ref={meshRef} model={item} onClick={onObjectClick} dir={dir} zoomed={zoomed} />
                </a.group>
            ))}
            <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={0.1} />
        </Canvas>
    );
};

export default Scene;
