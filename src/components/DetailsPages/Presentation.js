import "./Details.css"
import React from "react";

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import { Image } from 'primereact/image';
import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';


const Presentation = () => {
    return (
        <div className="details">
            <Panel className="panel" header={"Presentation"}>
            <Image src='../assets/moi.jpg' alt="Photo de profil" width={150} about={"My face lol"} title={"It's me"}/>
            <h3>Your Name</h3>
            <p>Your Age</p>
                <p>contact</p>
                <p>contact</p>
                <p>contact</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div>

                <Avatar icon="pi pi-github" shape={"circle"} onClick={() => window.open("https://github.com/lululazone")}/>
                <Avatar icon="pi pi-linkedin" shape={"circle"} onClick={() => window.open("https://www.linkedin.com/in/lucas-girard-6bb4261b4/")}/>
            </div>
            </Panel>
        </div>
    )
}

export default Presentation