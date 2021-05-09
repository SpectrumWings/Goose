import { useState } from 'react'
import "./DialogueStyle.css"
import goose from '../../images/goose_head.png';

const Dial = (props) => {
    return (
        <div className="box"
        onClick={props.closeDia}
        >
            <div className="opa">
                <p className="content">
                    {props.text}
                </p>
                
            </div>
            <img src={goose} alt="Goose" className="dd"/>
        </div>
    )
}

export default Dial
