import React from 'react'
import './Style.css';
import GreenButton from '../Buttons/GButton.js';

function ImageUpload(props) {

    return (
        
        <div className='upload_form'>
            <form
                
                onChange={props.change} 
                onSubmit={props.submission}
            >   <div className='polaroid_wraper'>
                <div className='input_wrapper'>
                    
                    <input className="browse" type="file" ref={props.fileInput}/>
                    <img className='preview' src={props.content}/>
                </div>
                </div>
                <GreenButton className='button_image' colour='../../images/button.png' text='Upload' type="submit"/>
                
                
                
                
            </form>
            <p>
                    Filename: {props.filename}
                </p>
        </div>
        
    )
}

export default ImageUpload
