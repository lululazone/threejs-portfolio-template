import React, { startTransition, useEffect, useRef, useState } from 'react';
import Scene from './components/Scene';
import Arrows from './components/Arrow';
import './App.css';
import { FontLoader } from "three/addons";
import { useTransition } from "@react-spring/three";
import * as THREE from "three";
import DialogPlanet from "./components/dialogbox/DialogPlanet";
import ArrowDetail from "./components/ArrowDetail";
import 'primereact/resources/themes/mdc-dark-indigo/theme.css';
import Toolbar from "./components/toolbar/Toolbar";
import Details from "./components/details/Details";
import { Planet } from "./models/Planet";
import { Anneau } from "./models/Anneau";

let dir = 5;
let dialogIsVisible = true;
function App() {
    const [currentModelIndex, setCurrentModelIndex] = useState(1);
    const [zoomed, setZoomed] = useState(false);
    const [detailsIsVisible, setDetailsIsVisible] = useState(false);
    const [font, setFont] = useState(null);
    const sceneRef = useRef(null);
    const detailsRef = useRef(null);

    const manager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(manager);
    const textures = [
        textureLoader.load('../assets/8k_mars.jpg'),
        textureLoader.load('../assets/8k_venus_surface.jpg'),
        textureLoader.load('../assets/8k_saturn.jpg'),
        textureLoader.load('../assets/2k_uranus.jpg'),
        textureLoader.load('../assets/2k_sun.jpg'),
        textureLoader.load('../assets/8k_earth_daymap.jpg'),
        textureLoader.load('../assets/earthlights1k.jpg'),
    ];

    const texturesAnneau = [
        textureLoader.load('../assets/2k_saturn_ring_alpha.png'),
    ];


    // create as many planet as you want here, just dont forget to load a texture in the textures array
    const models = [
        new Planet(0, textures[0], null, 'Presentation', 2, 'Short description of myself', null, new THREE.Color("#e4a471")),
        new Planet(1, textures[1], null, 'Studies', 4, 'List of my studies', null, new THREE.Color("#e3c6a7")),
        new Planet(2, textures[2], null, 'Experience', 1, 'List of my experiences', new Anneau(texturesAnneau[0], 10), new THREE.Color("#ecdcb9")),
        new Planet(3, textures[3], null, 'Skills', 0.5, 'List of my skills', null, new THREE.Color("#a6d9e7")),
        new Planet(4, textures[5], textures[6], 'Contact', 3, 'Contact information', null, new THREE.Color("#78b7e3")),
    ];

    useEffect(() => {
        startTransition(() => {
            const loader = new FontLoader();
            loader.load('/font.json', (loadedFont) => {
                setFont(loadedFont);
            });
        });
    }, []);


    const handleLeftClick = () => {
        setCurrentModelIndex((prevIndex) =>
            prevIndex === 0 ? models.length - 1 : prevIndex - 1
        );
        dir = -5;
        setZoomed(false);
    };

    const handleRightClick = () => {
        setCurrentModelIndex((prevIndex) =>
            prevIndex === models.length - 1 ? 0 : prevIndex + 1
        );
        dir = 5;
        setZoomed(false);
    };

    const handleObjectClick = () => {
        setZoomed(true);
        setTimeout(() => {
            if (detailsRef.current) {
                detailsRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 2000); // Délai pour laisser le zoom se produire
        dialogIsVisible = false;
        setDetailsIsVisible(true);
    };

    const handleTopClick = () => {
        setTimeout(() => {
            if (sceneRef.current) {
                sceneRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        });
        setZoomed(false);
        dialogIsVisible = true;

        sleep(1000).then(() => {
            setDetailsIsVisible(false);
        });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const isDialogVisible = () => {
        dialogIsVisible = !detailsIsVisible;
        return dialogIsVisible;
    }

    return (
        <div className="App" id="app">
            <Toolbar models={models} stateChanger={setCurrentModelIndex}></Toolbar>
            <Arrows onLeftClick={handleLeftClick} onRightClick={handleRightClick} />
            <DialogPlanet model={models[currentModelIndex]} clicked={handleObjectClick} visible={isDialogVisible()}></DialogPlanet>

            <div className="scene" id="scene" ref={sceneRef}>
                <Scene id="scene" model={models[currentModelIndex]} dir={dir} zoomed={zoomed} sunTexture={textures[4]} />
            </div>
            {detailsIsVisible && (
                <div ref={detailsRef} className="details">
                    <ArrowDetail onTopClick={handleTopClick}></ArrowDetail>
                    <Details model={models[currentModelIndex]}></Details>
                </div>
            )}
        </div>
    );
}

export default App;
