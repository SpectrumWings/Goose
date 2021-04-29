import React from 'react'
import './Style.css';

const GreenButton = (props) => {
    return (
        <div>
            <button
                className='button_green'
                type={props.type}
            >
                {props.text}
            </button>
        </div>
    )
}

export default GreenButton
