import React from 'react'
import './Style.css';
import GreenButton from '../Buttons/GButton.js';

function ImageUpload(props) {

    return (
        
        <div className='upload_form'>
            <button className='cancel' onClick={props.close}/>
            <form
                
                onChange={props.change} 
                onSubmit={props.submission}>
              
                <div className='input_wrapper'>
                    
                  
                        <input className="browse" type="file"/>
                        <img className='preview' alt="" src={props.content}/>
                    
                </div>

                <GreenButton className='button_image' colour='../../images/button.png' text='Upload' type="submit"/>
                
                <p>{props.prediction}</p>
                
                
            </form>
            <p>
                    Filename: {props.filename}
                </p>
        </div>
        
    )
}

export default ImageUpload
