import 'primereact/resources/themes/arya-blue/theme.css';
import { Toolbar as PrimeToolbar} from 'primereact/toolbar';
import { Button } from 'primereact/button';
import {useState} from "react";
import {Sidebar} from "primereact/sidebar";
import Player from "../audioplayer/Player";
import './Toolbar.css';
import Meteors from "../meteors.tsx";





const Toolbar = ({models, stateChanger}) => {
    const [visible, setVisible] = useState(false);

    function ProcessPlanet(model) {
        let index = models.indexOf(model);
        stateChanger(index);
        setVisible(false);
    }

    return (
        <PrimeToolbar className={"p-toolbar"}
            style={{display: 'flex', justifyContent: 'space-between', padding: '0 5%' }}
         start={
             <div >
                 <Sidebar visible={visible} onHide={() => setVisible(false)}>
                        <h1>Menu</h1>
                        <ul>
                            {models.map((model) => (
                                <li key={model.id}>
                                    <Button label={model.name} link onClick={() => ProcessPlanet(model)} />
                                </li>
                            ))}
                        </ul>
                 </Sidebar>
                 <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
             </div>
         }

         center={
            <div>
                <Meteors></Meteors>
                <h1>Your Name</h1>
            </div>

         }
         end={
             <Player></Player>
         }
        >

        </PrimeToolbar>

    )
}

export default Toolbar;