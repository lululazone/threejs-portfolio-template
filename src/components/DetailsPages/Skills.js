import {Panel} from "primereact/panel";
import {Image} from "primereact/image";
import {Avatar} from "primereact/avatar";
import React from "react";
import IconCloud from "../icon-cloud.tsx";


//You can add other stuff here
const slugs = [
    "typescript",
    "javascript",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "postgresql",
    "firebase",
    "jest",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "figma",
    "c",
    "c#",
    "cplusplus",
    "python",
    "angular",
    "tailwind",
    "apple",
    "windows",
    "linux",
    "jetbrains",
    "spring",
    "dotnet",
    "unity",
    "blender",
    "ocaml",
    "gnubash",
];

const Skills = () => {
    return (
        <div className="details">
            <Panel className="panel" header={"Skills"}>

                <div className="sphereSkill"><IconCloud iconSlugs={slugs} ></IconCloud></div>

            </Panel>
        </div>
    )
}

export default Skills