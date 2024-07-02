import {Image} from "primereact/image";
import {Avatar} from "primereact/avatar";
import {Panel} from "primereact/panel";
import React, {useRef} from "react";
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import emailjs from '@emailjs/browser';



const Contact = () => {




    const [text, setText] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [lastname, setLastname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState("");


    const form = useRef();
    var templateParams = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        message: text

    };

    var Options = {
        publicKey : 'PUBLIC_KEY_HERE'
    };



    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .send('SERVICE_ID', 'TEMPLATE_ID',templateParams, Options).then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
                console.log('FAILED...', error);
            },
        );
    };

    return (
        <Panel className="panel" header={"Contact me !"}>
            <form ref={form} onSubmit={sendEmail}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="firstname">Firstname</label>
                        <InputText id="firstname" name="firstname" type="text" onInput={(e) => setFirstname(e.target.value)}/>
                    </div>
                    <div className="p-field">
                        <label htmlFor="lastname">Lastname</label>
                        <InputText id="lastname" name="lastname" type="text" onInput={(e) => setLastname(e.target.value)}/>
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" name="email" type="email" onInput={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="p-field">
                        <label htmlFor="phone">Phone</label>
                        <InputText id="phone" name="phone" type="number" onInput={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className="p-field">
                        <label htmlFor="message">Message</label>
                        <Editor style={{height:'320px'}} value={text} id="message" name="message" onTextChange={(e) => setText(text)} />
                    </div>
                    <div className="p-field">
                        <button type="submit" className="p-button p-component p-button-text-icon-left p-button-success" >
                            <span className="p-button-icon-left pi pi-check"></span>
                            <span className="p-button-label">Submit</span>
                        </button>
                    </div>
                </div>
            </form>
        </Panel>
    )
}

export default Contact

