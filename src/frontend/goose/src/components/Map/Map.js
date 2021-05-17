import React, { useState } from 'react';
import title from '../../images/title.png';
import Dial from '../Messages/Dialogue'
import axios from 'axios';
import Cookies from 'universal-cookie';


import './MapStyle.css'

const MapPage = (props) => {

    const [displayAnimals, setDisplayAnimals] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [dOpen, setDOpen] = useState(true);

    function closeDialogue() {
        setDOpen(false)
    }

    const cookies = new Cookies();

    function fetchUserAnimals(){
        let token = cookies.get("Goose Session");
        let em = props.email
        axios({
            method: "post",
            url: "/fetchUAnimals",
            headers: {'Content-Type': 'application/json' },
            data: {
                email: em,
                token: token,
            }
          })
          .then((res) =>{

            let i;
            let item;
            for (i = 0; i < res.data.length; i++){
      
                item = res.data[i]
                if (res.data['new'] === true){
                    item['x'] = (width/2);
                    item['y'] = (height/2 + 100);
                }
                else{
                    item['x'] = (Math.floor(Math.random() * width));
                    item['y'] = (Math.floor(Math.random() * height));
                }
                setDisplayAnimals(displayAnimals.push(item));
                console.log(item)
            }
          })
    }


    let newAnimalMessage;
    if (props.filename !== "" && dOpen === true){
       

        newAnimalMessage = 
        <Dial
        closeDia={closeDialogue}
        text="Here's Your Little Guy! You can view details if you click them"
        />
    }

    let generalIntroMessage;
    if (props.filename === "" && dOpen === true){
        generalIntroMessage = 
        <Dial 
        closeDia={closeDialogue}
        text="Welcome to the exhibit. Check out some of the animals"
        />
    }


    return (
        <div className="map_background" onLoad={fetchUserAnimals}>       
            <div className="map">
                {newAnimalMessage}
                <canvas id="animalCanvas" width={width}/>
                {generalIntroMessage}
            </div>
        </div>
    )
}

export default MapPage
