import React, { useState } from 'react';
import title from '../../images/title.png';
import Dial from '../Messages/Dialogue'


import './MapStyle.css'

const MapPage = (props) => {

    const [displayAnimals, setDisplayAnimals] = useState([]);
    const [dOpen, setDOpen] = useState(true);

    function closeDialogue() {
        setDOpen(false)
    }


    let newAnimal;
    if (props.filename !== "" && dOpen === true){
        let animal = {content: props.content, animal: "goose", x: (window.screen.width/2), y: (window.screen.height/2 + window.screen.height/8),};

        newAnimal = 
        <Dial
        closeDia={closeDialogue}
        text="Here's Your Little Guy! You can view details if you click them"
        />
    }

    let generalIntro;
    if (props.filename === "" && dOpen === true){
        generalIntro = 
        <Dial 
        closeDia={closeDialogue}
        text="Welcome to the exhibit. Check out some of the animals"
        />
    }


    return (
        <div className="map_background">
            <header>
                <button className='header_button'>
                    About
                </button>
                <button className='header_button'>
                    Filler
                </button>
                <img src={title} alt="Goose Home" className="title"/>
            </header>
            
            <div className="map">
                {newAnimal}
                {generalIntro}
            </div>
        </div>
    )
}

export default MapPage
